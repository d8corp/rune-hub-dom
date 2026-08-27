import { classes, type ClassesArgument } from 'html-classes'
import type { Rune } from 'rune-hub'

import { type HTMLProps } from '../../types'
import { inject } from '../../utils'

export type Styles = Record<string, any>
export type ClassProp<S = any> = ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>

export interface Style<S = any> {
  class?: ClassProp<S>
}

export type HTMLStyleProps<E extends HTMLElement = HTMLElement, S = any> = Omit<HTMLProps<E>, 'class'> & Style<S>

export function useStyles<S extends Record<string, string>> (styles: S, className?: ClassProp<S>): { [K in keyof S]: string | Rune<string> } {
  const classNames = typeof className === 'object' && !Array.isArray(className) && className !== null ? className : { root: className }
  const result: S = { ...classNames } as S

  for (const key in styles) {
    const className = classNames[key]

    result[key] = inject(className, className => classes([
      styles[key],
      className,
    ]) || undefined) as any
  }

  return result
}
