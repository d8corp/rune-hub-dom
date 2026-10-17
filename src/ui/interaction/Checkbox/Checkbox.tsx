import { classes } from 'html-classes'

import { useEffect, useStyles } from '../../../hooks'
import type { HTMLRef, Merge, ObservableProp } from '../../../types'
import { addCSS, getSlotEvent, inject, injectAll, Ref, SystemSlot, use } from '../../../utils'
import type { BoxProps, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

export type CheckboxChecked = boolean | null

if (import.meta.env?.RD_THEME_CHECKBOX) {
  addCSS(import.meta.env.RD_THEME_CHECKBOX, 'checkbox')
}

export const checkboxStyles = {
  root: import.meta.env?.RD_THEME_CHECKBOX__ROOT,
  primary: import.meta.env?.RD_THEME_CHECKBOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_CHECKBOX__ACCENT,
  success: import.meta.env?.RD_THEME_CHECKBOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_CHECKBOX__WARNING,
  danger: import.meta.env?.RD_THEME_CHECKBOX__DANGER,
  disabled: import.meta.env?.RD_THEME_CHECKBOX__DISABLED,
  clickable: import.meta.env?.RD_THEME_CHECKBOX__CLICKABLE,
  hoverable: import.meta.env?.RD_THEME_CHECKBOX__HOVERABLE,
  input: import.meta.env?.RD_THEME_CHECKBOX__INPUT,
  indeterminate: import.meta.env?.RD_THEME_CHECKBOX__INDETERMINATE,
}

export type CheckboxStyles = typeof checkboxStyles

export type CheckboxProps<T extends FlexElement = 'div', S extends CheckboxStyles = CheckboxStyles> = Omit<Merge<BoxProps<T, S & BoxStyles>, {
  checked?: ObservableProp<CheckboxChecked>
  inputRef?: HTMLRef<'input'>
  name?: ObservableProp<string>
  disabled?: ObservableProp<boolean>
  value?: ObservableProp<boolean>
  onChange?: (checked: boolean) => void
}>, 'children'>

function CheckboxComponent<T extends FlexElement = 'div', S extends CheckboxStyles = CheckboxStyles> ({
  checked,
  disabled,
  inputRef = new Ref<HTMLInputElement>(),
  name,
  value,
  color,
  onChange,
  ...props
}: CheckboxProps<T, S>) {
  const styles = useStyles(checkboxStyles, props.class)
  const setChecked = getSlotEvent(checked, onChange)

  const handleChange = (e: any) => {
    setChecked?.(e.target.checked)
  }

  const root = injectAll([
    styles.root,
    inject(checked, checked => checked === null && styles.indeterminate),
  ], classes)

  if (checked) {
    useEffect(() => {
      new SystemSlot(() => {
        if (inputRef.value) {
          inputRef.value.checked = Boolean(use(checked))
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
      color={inject(disabled, disabled => disabled ? 'disabled' : color)}
      class={{ ...styles, root }}
    >
      <input
        type='checkbox'
        class={styles.input}
        ref={inputRef}
        disabled={disabled}
        name={name}
        value={inject(value, value => value ? 'true' : 'false')}
        onchange={handleChange}
      />
    </Box>
  )
}

export const Checkbox = import.meta.env?.RD_UI_CHECKBOX
  ? import.meta.require?.(import.meta.env.RD_UI_CHECKBOX).Checkbox as typeof CheckboxComponent
  : CheckboxComponent
