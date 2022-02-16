import qs from 'querystring'
import { createCollect } from '../integrations/prom-client'
import type { CCServer } from '..'
import type { Middleware } from '..'
import type { DefaultContext } from 'koa'
import type {
  TypedCollector,
  MetriceConstructorOptions
} from '../integrations/prom-client'
import { ecode } from '../constants'

interface PromQuery {
  fn: string
  labels: string[]
  args: string[]
}

export function parsePromRequest(id: string): {
  basename: string
  query: PromQuery
} {
  const [basename, rawQuery] = id.split(`?`, 2)
  const query = qs.parse(rawQuery) as unknown as PromQuery

  return {
    basename: basename.slice(1),
    query
  }
}

function getLabels(labelNames: readonly string[] | undefined, args: string[]) {
  const acc: Record<string, string> = {}
  if (!labelNames) {
    return acc
  }
  for (let i = 0; i < labelNames.length; i++) {
    acc[labelNames[i]] = args[i]
  }
  return acc
}

function getCollector(
  ctx: DefaultContext,
  options: MetriceConstructorOptions
): TypedCollector {
  const { collect } = ctx

  const res = collect.get(options.name)
  if (!res) {
    const collector = createCollect(options) as TypedCollector
    collector.type = options.type
    collect.set(options.name, collector)

    return collector
  }

  return res
}

function callCollectorFunction(
  collector: TypedCollector,
  labels: Record<string, string>,
  fn: string,
  args: string[]
): boolean {
  if (!(fn in collector) || typeof (collector as any)[fn] !== 'function') {
    return false
  }
  if (!Array.isArray(args)) {
    args = [args]
  }
  ;(collector as any)[fn](labels, ...args.map((v) => Number(v)))
  return true
}

/**
 * ps: http://localhost:9091/performance?labels=index&labels=3000&fn=observe&args=1
 */
export default function prometheusProxyMiddleware(
  server: CCServer
): Middleware {
  const { config } = server

  return (ctx, next) => {
    const { url } = ctx.req
    const { basename, query } = parsePromRequest(url || ctx.path)
    const { labels, fn, args } = query
    const metricConfig = config.metric.get(basename)

    if (!metricConfig) {
      ctx.json(ecode.NOT_METRICE_CONFIG, null, next)
      return
    }

    const collector = getCollector(ctx, metricConfig)!

    // if (isCounter(collector)) {
    //   //
    // } else if (isGauge(collector)) {
    //   //
    // } else if (isHistogram(collector)) {
    //   //
    // } else if (isSummary(collector)) {
    //   //
    // }

    callCollectorFunction(
      collector,
      getLabels(metricConfig.labelNames, labels),
      fn,
      args
    )
    ctx.json(ecode.OK, null, next)
    return
  }
}
