import c2k from 'koa-connect'
import prom from 'express-prom-bundle'
import type { Middleware } from '..'

export default function prometheusMiddleware(): Middleware {
  return c2k(
    prom({
      buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
      includeMethod: true,
      includePath: true,
      customLabels: { date: null, version: null },
      promClient: {
        collectDefaultMetrics: {}
      },
      excludeRoutes: [
        '/robots.txt',
        '/service-worker.js',
        '/_healthz',
        '/favicon.ico',
        /\/(js|css|sentry|img)/
      ],
      normalizePath: [],
      urlValueParser: {
        minHexLength: 5,
        extraMasks: [
          '^[0-9]+\\.[0-9]+\\.[0-9]+$', // replace dot-separated dates with #val, (regex as string)
          /^[0-9]+\\-[0-9]+\\-[0-9]+$/ // replace dash-separated dates with #val (actual regex)
        ]
      }
    }) as any
  )
}
