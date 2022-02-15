import type { CCServer } from '../src'
import type koa from 'koa'
import type { TypedCollector } from '../src/integrations/prom-client'

declare module 'koa' {
  enum ecode {
    OK = 0
  }

  interface DefaultState {}

  interface DefaultContext {
    /**
     * cc server instance
     */
    server: CCServer

    /**
     * prometheus collector instance
     */
    collect: Map<string, TypedCollector>

    /**
     * json return
     */
    json: (ecode: ecode, data: any, next: koa.Next) => void
  }
}
