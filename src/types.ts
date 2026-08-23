import type { Rune, Slot } from 'rune-hub'

import type { Ref } from './utils'

export type JSXType = Component | string | undefined
export type JSXTypeProps<T extends JSXType> = T extends string ? Record<string, any> : T extends Component<infer P> ? P : never
export type JSXElement = undefined | void | null | number | string | Rune | Child | JSXNode | Slot<JSXElement> | JSXElement[]
export type Props = Record<string, any>
export type Component<P extends Props = any, R extends JSXElement = JSXElement> = (props: P) => R
export type DomElement = HTMLElement | SVGElement
export type Parent = DomElement | Comment | DocumentFragment
export type Child = Parent | Text
export type ObservableProp<T = unknown> = T | Rune<T> | Slot<T>

type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` :
  S

type KeysToKebabCase<T> = {
  [K in keyof T as CamelToKebabCase<string & K>]: T[K]
}

export type HTMLStyleKeys = keyof KeysToKebabCase<Omit<
  HTMLElement['style'],
  'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'
>> | `--${string}`

export type HTMLStyleProp = Partial<Record<HTMLStyleKeys, ObservableProp<string>>>

export interface ChildrenProps {
  children?: JSXElement
}

export interface HTMLDefaultProps<E extends DomElement = HTMLElement> extends ChildrenProps {
  class?: ObservableProp<string | undefined>
  style?: HTMLStyleProp
  ref?: Ref<E>
}

export type HTMLDataProps = Record<`data-${string}`, ObservableProp<string>>

type ExcludeKeys = symbol | keyof HTMLDefaultProps

export type HTMLProps<E extends DomElement = HTMLElement> = {
  [K in Extract<keyof E, `on${string}`>]?: E[K];
} & {
  [K in Exclude<keyof E, ExcludeKeys> as NonNullable<E[K]> extends Function ? never : K]?: ObservableProp<string | undefined | (E[K] extends number ? number : undefined)>;
} & {
  [K in Exclude<keyof E, ExcludeKeys> as NonNullable<E[K]> extends Function ? never : `${'_' | '$'}${K}`]?: ObservableProp<E[K] | undefined>;
} & HTMLDefaultProps<E> & HTMLDataProps

export class JSXNode <T extends JSXType = JSXType> {
  constructor (
    public type: T,
    public props: JSXTypeProps<T>,
  ) {}
}
