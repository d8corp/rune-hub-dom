import { classes, type ClassesArgument } from 'html-classes'

import type { ElementTagName, HTMLProps, Merge, Reactive } from '../../types'
import { inject } from '../../utils'

export type Styles = Record<string, string>
export type ObservableStyles<S extends Styles> = { [K in keyof S]: string | Reactive<string> }
export type HTMLClassProp<S extends Styles = any> = ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>

export interface StyledProps<S extends Styles = Styles> {
  class?: HTMLClassProp<S>
}

export type HTMLStyleProps<T extends ElementTagName = ElementTagName, S extends Styles = Styles> = Merge<HTMLProps<T>, StyledProps<S>>

export function useStyles<S extends Styles, SS extends S> (
  styles: S,
  className?: HTMLClassProp<SS>,
): ObservableStyles<SS> {
  const classNames = typeof className === 'object' && !Array.isArray(className) && className !== null ? className : { root: className }
  const result: SS = { ...classNames } as SS

  for (const key in styles) {
    const className = classNames[key]

    result[key] = inject(className, className => classes([
      styles[key],
      className,
    ]) || undefined) as any
  }

  return result
}
