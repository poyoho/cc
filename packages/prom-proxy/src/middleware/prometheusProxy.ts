import type { CCServer, Middleware } from '..'
import type { DefaultContext } from 'koa'
import { createCollect } from '../integrations/prom-client'
import type { TypedCollector } from '../integrations/prom-client'

function getCollect(ctx: DefaultContext, name: string): TypedCollector | null {
  const { collect, server } = ctx

  const res = collect.get(name)
  if (!res) {
    const constructorAragments = server.config.metric.get(name)
    if (!constructorAragments) {
      return null
    }

    const collector = createCollect({
      ...constructorAragments
    }) as TypedCollector
    collector.type = constructorAragments.type
    collect.set(name, collector)

    return collector
  }

  return res
}

export default function prometheusProxyMiddleware(
  server: CCServer
): Middleware {
  // const { } = server.config

  return (ctx, next) => {}
}
