import type { CCServer } from '../src'
import type koa from 'koa'
import type { TypedCollector } from '../src/integrations/prom-client'
import type { ecode } from '../src/constants'

declare module 'koa' {
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
    json(ecode: ecode, data: any, next: koa.Next): void
  }
}
