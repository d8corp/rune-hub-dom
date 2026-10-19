import { classes } from 'html-classes'

import { useEffect, useStyles } from '../../../hooks'
import type { HTMLRef, Merge, ObservableProp } from '../../../types'
import { addCSS, getSlotEvent, inject, injectAll, Ref, SystemSlot, use } from '../../../utils'
import type { BoxProps, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

export type CheckBoxChecked = boolean | null

if (import.meta.env?.RD_THEME_CHECK_BOX) {
  addCSS(import.meta.env.RD_THEME_CHECK_BOX, 'check-box')
}

export const checkBoxStyles = {
  root: import.meta.env?.RD_THEME_CHECK_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_CHECK_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_CHECK_BOX__ACCENT,
  success: import.meta.env?.RD_THEME_CHECK_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_CHECK_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_CHECK_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_CHECK_BOX__DISABLED,
  input: import.meta.env?.RD_THEME_CHECK_BOX__INPUT,
  indeterminate: import.meta.env?.RD_THEME_CHECK_BOX__INDETERMINATE,
}

export type CheckBoxStyles = typeof checkBoxStyles

export type CheckBoxProps<T extends FlexElement = 'div', S extends CheckBoxStyles = CheckBoxStyles> = Omit<Merge<BoxProps<T, S & BoxStyles>, {
  checked?: ObservableProp<CheckBoxChecked>
  inputRef?: HTMLRef<'input'>
  name?: ObservableProp<string>
  disabled?: ObservableProp<boolean>
  value?: ObservableProp<string>
  onChange?: (checked: boolean) => void
}>, 'children'>

function CheckBoxComponent<T extends FlexElement = 'div', S extends CheckBoxStyles = CheckBoxStyles> ({
  checked,
  inputRef = new Ref<HTMLInputElement>(),
  disabled,
  name,
  value,
  color,
  onChange,
  ...props
}: CheckBoxProps<T, S>) {
  const styles = useStyles(checkBoxStyles, props.class)
  const setChecked = getSlotEvent(checked, onChange)
  let click = false

  const handleChange = (e: any) => {
    click = true
    setChecked?.(e.target.checked)
    click = false
  }

  const root = injectAll([
    styles.root,
    inject(checked, checked => checked === null && styles.indeterminate),
  ], classes)

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

export const CheckBox = import.meta.env?.RD_UI_CHECK_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_CHECK_BOX).CheckBox as typeof CheckBoxComponent
  : CheckBoxComponent
