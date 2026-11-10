import { classes } from 'html-classes'

import { useEffect, useStyles } from '../../../hooks'
import type { HTMLRef, Merge, ObservableProp } from '../../../types'
import { addUiCSS, getSlotEvent, inject, injectAll, Ref, SystemSlot, use } from '../../../utils'
import type { BoxProps, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_TOGGLE) {
  addUiCSS(import.meta.env.RD_THEME_TOGGLE, 'toggle')
}

export const toggleStyles = {
  root: import.meta.env?.RD_THEME_TOGGLE__ROOT,
  input: import.meta.env?.RD_THEME_TOGGLE__INPUT,
}

export type ToggleStyles = typeof toggleStyles

export type ToggleProps<T extends FlexElement = 'div', S extends ToggleStyles = ToggleStyles> = Omit<Merge<BoxProps<T, S & BoxStyles>, {
  checked?: ObservableProp<boolean>
  inputRef?: HTMLRef<'input'>
  name?: ObservableProp<string>
  disabled?: ObservableProp<boolean>
  value?: ObservableProp<string>
  onChange?: (checked: boolean) => void
}>, 'children'>

/**
 * A switch that toggles a single option on or off.
 * Renders a hidden native `<input type="checkbox">`, so keyboard, form and accessibility behavior stay intact.
 */
export function ToggleComponent<T extends FlexElement = 'div', S extends ToggleStyles = ToggleStyles> ({
  checked,
  inputRef = new Ref<HTMLInputElement>(),
  disabled,
  name,
  value,
  color,
  onChange,
  ...props
}: ToggleProps<T, S>) {
  const styles = useStyles(toggleStyles, props.class)
  const root = injectAll([styles.root], classes)
  const setChecked = getSlotEvent(checked, onChange)
  let click = false

  const handleChange = (e: any) => {
    click = true
    setChecked?.(e.target.checked)
    click = false
  }

  if (checked && checked !== true) {
    useEffect(() => {
      new SystemSlot(() => {
        const value = Boolean(use(checked))

        if (!click) {
          inputRef.value!.checked = value
        }
      }).on()
    })
  }

  return (
    <Box
      element='label'
      view='bordered'
      size='s'
      interact={inject(disabled, disabled => disabled ? undefined : 'clickable')}
      {...props as BoxProps<T, S & BoxStyles>}
      color={inject(disabled, disabled => disabled ? 'disabled' : use(color) ?? 'primary')}
      class={{ ...styles, root }}
    >
      <input
        type='checkbox'
        role='switch'
        class={styles.input}
        ref={inputRef}
        disabled={disabled}
        name={name}
        value={value}
        checked={checked === true}
        onchange={handleChange}
      />
    </Box>
  )
}

export const Toggle = import.meta.env?.RD_UI_TOGGLE
  ? import.meta.require?.(import.meta.env.RD_UI_TOGGLE).Toggle as typeof ToggleComponent
  : ToggleComponent
