import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import { Show } from '../../../components'
import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, SMLSize } from '../../../types'
import { addCSS, inject, injectAll, SystemSlot } from '../../../utils'
import type { BoxProps, BoxSize, BoxStyles, FlexElement } from '../../primitive'
import { Box, Spin } from '../../primitive'

if (import.meta.env?.RD_THEME_BUTTON) {
  addCSS(import.meta.env.RD_THEME_BUTTON, 'button')
}

export const buttonStyles = {
  root: import.meta.env?.RD_THEME_BUTTON__ROOT,
  primary: import.meta.env?.RD_THEME_BUTTON__PRIMARY,
  accent: import.meta.env?.RD_THEME_BUTTON__ACCENT,
  secondary: import.meta.env?.RD_THEME_BUTTON__SECONDARY,
  success: import.meta.env?.RD_THEME_BUTTON__SUCCESS,
  warning: import.meta.env?.RD_THEME_BUTTON__WARNING,
  danger: import.meta.env?.RD_THEME_BUTTON__DANGER,
  disabled: import.meta.env?.RD_THEME_BUTTON__DISABLED,
  square: import.meta.env?.RD_THEME_BUTTON__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BUTTON__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BUTTON__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BUTTON__CIRCLE,
  loading: import.meta.env?.RD_THEME_BUTTON__LOADING,
  spin: import.meta.env?.RD_THEME_BUTTON__SPIN,
  clickable: import.meta.env?.RD_THEME_BUTTON__CLICKABLE,
  s: import.meta.env?.RD_THEME_BUTTON__S,
  m: import.meta.env?.RD_THEME_BUTTON__M,
  l: import.meta.env?.RD_THEME_BUTTON__L,
  filled: import.meta.env?.RD_THEME_BUTTON__FILLED,
  bordered: import.meta.env?.RD_THEME_BUTTON__BORDERED,
  ghost: import.meta.env?.RD_THEME_BUTTON__GHOST,
  dashed: import.meta.env?.RD_THEME_BUTTON__DASHED,
}

export const buttonSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type ButtonStyles = typeof buttonStyles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = Merge<BoxProps<T, S & BoxStyles>, {
  size?: ObservableProp<SMLSize>
  loading?: ObservableProp<boolean>
  disabled?: ObservableProp<boolean>
  onclick?: (e: MouseEvent) => void | Promise<void>
}>

function ButtonComponent<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  loading = new SystemSlot(() => false),
  onclick,
  children,
  color,
  size = 'm',
  disabled,
  interact,
  ...props
}: ButtonProps<T, S>) {
  const styles = useStyles(buttonStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(loading, loading => loading && styles.loading),
  ], classes)

  function handleClick (e: MouseEvent) {
    const result = onclick?.(e)

    if (result && result instanceof Promise && loading instanceof Slot) {
      loading.set(true)

      result.finally(() => {
        loading.set(false)
      })
    }
  }

  return (
    <Box
      element='button'
      view='bordered'
      {...(props as BoxProps<T, S & BoxStyles>)}
      interact={injectAll([interact, disabled], ([interact, disabled]) => disabled ? undefined : interact)}
      color={injectAll([color, disabled], ([color, disabled]) => disabled ? 'disabled' : color)}
      size={inject(size, size => buttonSizeMap[size])}
      class={{ ...styles, m: styles.s, l: styles.m, xl: styles.l, root }}
      onclick={handleClick}
    >
      {children}
      <Show when={loading}>
        <Spin class={styles.spin} />
      </Show>
    </Box>
  )
}

export const Button = import.meta.env?.RD_UI_BUTTON
  ? import.meta.require?.(import.meta.env.RD_UI_BUTTON).Button as typeof ButtonComponent
  : ButtonComponent
