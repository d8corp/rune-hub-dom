import { Show } from '@/components'
import { useStyles } from '@/hooks'
import type { Merge, ObservableProp } from '@/types'
import type { BlockProps, FlexElement } from '@/ui/primitive'
import { Block, Spin } from '@/ui/primitive'
import { addCSS, inject, injectAll, SystemSlot } from '@/utils'
import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

const transform = import.meta.env?.RD_THEME__TRANSFORM__BUTTOM &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__BUTTOM).default

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
  circle: import.meta.env?.RD_THEME_BUTTON__CIRCLE,
  loading: import.meta.env?.RD_THEME_BUTTON__LOADING,
  spin: import.meta.env?.RD_THEME_BUTTON__SPIN,
  m: import.meta.env?.RD_THEME_BUTTON__M,
  s: import.meta.env?.RD_THEME_BUTTON__S,
  l: import.meta.env?.RD_THEME_BUTTON__L,
}

export type ButtonStyles = typeof buttonStyles

export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = Merge<BlockProps<T, S>, {
  loading?: ObservableProp<boolean>;
  onclick?: (e: PointerEvent) => void | Promise<void>;
}>

function ButtonComponent<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  loading = new SystemSlot(() => false),
  onclick,
  children,
  ...props
}: ButtonProps<T, S>) {
  const styles = useStyles(buttonStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(loading, loading => loading && styles.loading),
  ], classes)

  function handleClick (e: PointerEvent) {
    const result = onclick?.(e)

    if (result && result instanceof Promise && loading instanceof Slot) {
      loading.set(true)

      result.finally(() => {
        loading.set(false)
      })
    }
  }

  return (
    <Block element='button' {...(props as BlockProps<T, S>)} class={{ ...styles, root }} onclick={handleClick}>
      {children}
      <Show when={loading}>
        <Spin class={styles.spin} />
      </Show>
    </Block>
  )
}

export const Button = transform
  ? transform(ButtonComponent) as typeof ButtonComponent
  : ButtonComponent
