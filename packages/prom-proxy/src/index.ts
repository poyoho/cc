import koa from 'koa'
import prometheusMiddleware from './middleware/prometheus'
import prometheusProxyMiddleware from './middleware/prometheus'
import type { MetricMateData } from './integrations/prom-client'

export type Middleware = koa.Middleware<koa.DefaultState, koa.DefaultContext>

export interface ApiConfig {
  host: string
  port: number
}

export interface UserConfig {
  api?: ApiConfig

  metric?: MetricMateData[]
}

export interface ResolvedConfig {
  api: ApiConfig

  metric: Map<string, MetricMateData>
}

export interface CCServer {
  /**
   * The resolved config object
   */
  config: ResolvedConfig

  /**
   * A koa app instance.
   */
  app: koa<koa.DefaultState, koa.DefaultContext>

  /**
   * Start the server.
   */
  listen(port?: number): CCServer
}

function resolveConfig(inlineConfig?: UserConfig): ResolvedConfig {
  const metric =
    inlineConfig?.metric?.reduce((prev, next) => {
      prev.set(next.name, next)
      return prev
    }, new Map()) || new Map()

  const resolved: ResolvedConfig = {
    api: {
      host: inlineConfig?.api?.host || 'localhost',
      port: inlineConfig?.api?.port || 9091
    },
    metric
  }

  return resolved
}

function enhancementServer(server: CCServer) {
  const { app } = server

  app.context.server = server
  app.context.collect = new Map()
  app.context.json = async function (
    ecode: koa.ecode,
    data: any,
    next: koa.Next
  ) {
    this.body = {
      code: ecode,
      meseage: '',
      data: data
    }
    await next()
  }
}

export function createCCServer(inlineConfig?: UserConfig) {
  const app = new koa()
  const config = resolveConfig(inlineConfig)

  const server: CCServer = {
    config,

    app,

    listen(port?: number): CCServer {
      app.listen(port)

      return server
    }
  }

  enhancementServer(server)

  app.use(prometheusMiddleware())
  app.use(prometheusProxyMiddleware())

  return server
}
