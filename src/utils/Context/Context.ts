import type { Fn } from 'rune-hub'

import type { JSXElement } from '../../types'

type GetArray<T extends ReadonlyArray<Context>> = {
  [K in keyof T]: T[K] extends Context<infer D> ? D : never;
}

export type ContextData = Record<symbol, any>

export interface ContextProviderProps<C extends Context | ReadonlyArray<Context>> {
  for: C;
  set: C extends ReadonlyArray<Context> ? GetArray<C> : C extends Context<infer D> ? D : never;
  children: any;
}

export class Context<T = unknown> {
  static current: ContextData = Object.create(null)

  static use <A extends Fn<[]>>(fn: A, context: ContextData = Context.current): ReturnType<A> {
    const prevParent = Context.current
    Context.current = context
    const result = fn()
    Context.current = prevParent

    return result
  }

  static nest (): ContextData {
    return Object.create(Context.current)
  }

  static render: (content: JSXElement) => void

  static Provider <C extends Context | ReadonlyArray<Context>>(props: ContextProviderProps<C>) {
    const context = Context.nest()

    if (Array.isArray(props.for)) {
      const set = props.set as any[]

      for (let i = 0; i < props.for.length; i++) {
        props.for[i].set(set[i], context)
      }
    } else if (props.for instanceof Context) {
      props.for.set(props.set, context)
    }

    Context.use(() => Context.render(props.children), context)
  }

  key = Symbol('Context Key')

  constructor (public defaultValue: T) {}

  get<R extends T> (context: ContextData = Context.current): R {
    return this.key in context ? context[this.key] : this.defaultValue as R
  }

  set (value: T, context: ContextData = Context.current) {
    context[this.key] = value
  }
}
