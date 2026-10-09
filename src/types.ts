import type { DOMAttributes } from 'dom-types/native'
import type { Slot } from 'rune-hub'

import type { Content, Ref } from './utils'

export type ReactiveElement = () => JSXElement
export type ObservableElement = ReactiveElement | Slot<JSXElement>
export type BaseJSXElement = undefined | void | null | boolean | number | string | Child | JSXNode | JSXElement[] | ObservableElement
export type JSXElement = BaseJSXElement | Promise<BaseJSXElement>

export type JSXType = Component | string | undefined
export type JSXTypeProps<T extends JSXType> = T extends string ? Record<string, any> : T extends Component<infer P> ? P : never
export type Props = Record<string, any>
export type Component<P extends Props = any, R extends JSXElement = JSXElement> = (props: P) => R
export type DomElement = HTMLElement | SVGElement
export type Parent = DomElement | Content | DocumentFragment
export type Child = Parent | Text
export type StaticOrReactive<T = unknown> = T | Reactive<T>
export type ObservableProp<T = unknown> = StaticOrReactive<T> | Slot<T>
export type ReactiveProp<T = unknown> = Reactive<T> | Slot<T>
export type Reactive<T = unknown> = () => T

export interface JSXSource {
  fileName: string
  lineNumber: number
  columnNumber: number
}

export interface IContent {
  _parent?: Parent
  _prev?: Child
  _next?: Child
  _first?: Child
  _last?: Child
}

export type HTMLElementTagName = keyof HTMLElementTagNameMap
export type SVGElementTagName = keyof SVGElementTagNameMap
export type ElementTagName = HTMLElementTagName | SVGElementTagName
export type SelfClosingElementTagName = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'param' | 'source' | 'track' | 'wbr'

type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` :
  S

type KeysToKebabCase<T> = {
  [K in keyof T as CamelToKebabCase<string & K>]: T[K]
}

export type HTMLStyleKeys = keyof KeysToKebabCase<Omit<
  HTMLElement['style'],
  'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'cssText' | 'cssFloat'
>> | `--${string}` | '-webkit-line-clamp' | '-webkit-box-orient'

export type HTMLStyleProp = Partial<Record<HTMLStyleKeys, ObservableProp<string | undefined> | undefined>>

export interface ChildrenProps {
  children?: JSXElement
}

export type GetTagNameElement<T extends ElementTagName = ElementTagName> = T extends HTMLElementTagName
  ? HTMLElementTagNameMap[T]
  : T extends SVGElementTagName ? SVGElementTagNameMap[T] : never

export type HTMLRef<T extends ElementTagName = ElementTagName> = Ref<GetTagNameElement<T>>

export interface HTMLRefProps<T extends ElementTagName = ElementTagName> {
  ref?: HTMLRef<T>
}

export type BaseElementProps<T extends ElementTagName> = {
  [A in keyof DOMAttributes<T>]?: A extends `on${string}`
    ? DOMAttributes<T>[A]
    : A extends 'style'
      ? HTMLStyleProp
      : ObservableProp<DOMAttributes<T>[A] | undefined>
}

export interface ElementChildrenProps<T extends ElementTagName> {
  children?: T extends SelfClosingElementTagName ? never : JSXElement
}

export type JSXIntrinsicElements = {
  [T in ElementTagName]: BaseElementProps<T> & ElementChildrenProps<T> & HTMLRefProps<T>
}

export type HTMLProps<T extends ElementTagName = ElementTagName> = JSXIntrinsicElements[T]

export class JSXNode <T extends JSXType = JSXType> {
  constructor (
    public type: T,
    public props: JSXTypeProps<T>,
    public source?: JSXSource,
  ) {}
}

export type Merge<A, B> = B & Omit<A, keyof B>

export type RDColor = 'primary' | 'accent' | 'secondary' | 'success' | 'warning' | 'danger' | 'disabled'
export type RDSize = 's' | 'm' | 'l'
export type GlobalCSSValue = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'

declare global {
  interface Element extends IContent {}
  interface Text extends IContent {}
  interface DocumentFragment extends IContent {}
}
