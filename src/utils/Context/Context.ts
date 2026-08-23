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

  static use <F extends (...a: any[]) => any>(fn: F, context: ContextData = Context.current): F {
    return function (...args: any[]) {
      const prevParent = Context.current
      Context.current = context
      const result = fn(...args)
      Context.current = prevParent

      return result
    } as F
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

    Context.use(Context.render, context)(props.children)
  }

  key = Symbol('Context Key')

  constructor (public defaultValue: T) {}

  get (context: ContextData = Context.current): T {
    return this.key in context ? context[this.key] : this.defaultValue
  }

  set (value: T, context: ContextData = Context.current) {
    context[this.key] = value
  }
}
