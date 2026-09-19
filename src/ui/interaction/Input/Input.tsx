import { Slot } from 'rune-hub'
import SyncTimer from 'sync-timer'

import { Show } from '../../../components'
import { CloseIcon } from '../../../docs/icons'
import { useClear, useDebounceSlotEvent, useStyles } from '../../../hooks'
import type { JSXElement, Merge, ObservableProp } from '../../../types'
import { addCSS, getSlotEvent, inject, Ref } from '../../../utils'
import type { FieldProps } from '../../block'
import { Field } from '../../block'

if (import.meta.env?.RD_THEME_INPUT) {
  addCSS(import.meta.env.RD_THEME_INPUT, 'input')
}

export const inputStyles = {
  root: import.meta.env?.RD_THEME_INPUT__ROOT,
  primary: import.meta.env?.RD_THEME_INPUT__PRIMARY,
  accent: import.meta.env?.RD_THEME_INPUT__ACCENT,
  secondary: import.meta.env?.RD_THEME_INPUT__SECONDARY,
  success: import.meta.env?.RD_THEME_INPUT__SUCCESS,
  warning: import.meta.env?.RD_THEME_INPUT__WARNING,
  danger: import.meta.env?.RD_THEME_INPUT__DANGER,
  disabled: import.meta.env?.RD_THEME_INPUT__DISABLED,
  square: import.meta.env?.RD_THEME_INPUT__SQUARE,
  circle: import.meta.env?.RD_THEME_INPUT__CIRCLE,
  m: import.meta.env?.RD_THEME_INPUT__M,
  s: import.meta.env?.RD_THEME_INPUT__S,
  l: import.meta.env?.RD_THEME_INPUT__L,
  clear: import.meta.env?.RD_THEME_INPUT__CLEAR,
  input: import.meta.env?.RD_THEME_INPUT__INPUT,
}

export type InputStyles = typeof inputStyles

export interface InputFocusOptions extends FocusOptions {
  timeout?: number
}

export type InputProps<T extends string = string, S extends InputStyles = InputStyles> = Merge<FieldProps<'label', S>, {
  value?: ObservableProp<T>
  inputRef?: Ref<HTMLInputElement>
  before?: JSXElement
  after?: JSXElement
  name?: ObservableProp<string>
  clearable?: ObservableProp<boolean>
  autofocus?: boolean | number | InputFocusOptions
  debounce?: ObservableProp<boolean | number>
  onChange?: (newValue: string) => void
}>

export function Input<T extends string = '', S extends InputStyles = InputStyles> ({
  value = new Slot<T>(() => '' as T),
  inputRef,
  before,
  after,
  name,
  autofocus,
  clearable,
  debounce,
  onChange,
  ...props
}: InputProps<T, S>) {
  const styles = useStyles(inputStyles, props.class)
  const setValue = getSlotEvent(value, onChange)
  const setDebouncedValue = useDebounceSlotEvent(value, onChange, debounce)

  const handleInput = (e: any) => {
    setDebouncedValue?.(e.target.value)
  }

  if (autofocus) {
    if (!inputRef) {
      inputRef = new Ref<HTMLInputElement>()
    }

    const timer = new SyncTimer(() => {
      inputRef!.value!.focus(typeof autofocus === 'object' ? autofocus : undefined)
    }, typeof autofocus === 'number' ? autofocus : typeof autofocus === 'object' ? autofocus.timeout ?? 0 : 0)

    useClear(() => timer.cancel())
  }

  const clearContent = inject(clearable, clearable => clearable
    ? (
      <Show when={value}>
        <CloseIcon
          onmousedown={(e: Event) => {
            e.preventDefault()
            setValue?.('' as T)
          }}
          class={styles.clear}
        />
      </Show>
      )
    : null,
  )

  return (
    <Field element='label' {...props} class={styles}>
      {before}
      <input name={name} class={styles.input} ref={inputRef} _value={value} oninput={handleInput} />
      {clearContent}
      {after}
    </Field>
  )
}
