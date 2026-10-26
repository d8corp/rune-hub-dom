import { useEffect, useStyles } from '../../../hooks'
import type { HTMLRef, Merge, ObservableProp } from '../../../types'
import { addUiCSS, getSlotEvent, inject, Ref, SystemSlot, use } from '../../../utils'
import type { BoxProps, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_RADIO_BOX) {
  addUiCSS(import.meta.env.RD_THEME_RADIO_BOX, 'radio-box')
}

export const radioBoxStyles = {
  root: import.meta.env?.RD_THEME_RADIO_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_RADIO_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_RADIO_BOX__ACCENT,
  secondary: import.meta.env?.RD_THEME_RADIO_BOX__SECONDARY,
  success: import.meta.env?.RD_THEME_RADIO_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_RADIO_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_RADIO_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_RADIO_BOX__DISABLED,
  input: import.meta.env?.RD_THEME_RADIO_BOX__INPUT,
}

export type RadioBoxStyles = typeof radioBoxStyles

export type RadioBoxProps<T extends FlexElement = 'div', S extends RadioBoxStyles = RadioBoxStyles> = Omit<Merge<BoxProps<T, S & BoxStyles>, {
  checked?: ObservableProp<boolean>
  inputRef?: HTMLRef<'input'>
  name?: ObservableProp<string>
  disabled?: ObservableProp<boolean>
  value?: ObservableProp<string>
  onChange?: (checked: boolean) => void
}>, 'children'>

function RadioBoxComponent<T extends FlexElement = 'div', S extends RadioBoxStyles = RadioBoxStyles> ({
  checked,
  inputRef = new Ref<HTMLInputElement>(),
  disabled,
  name,
  value,
  color,
  onChange,
  ...props
}: RadioBoxProps<T, S>) {
  const styles = useStyles(radioBoxStyles, props.class)
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
      class={styles}
    >
      <input
        type='radio'
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

export const RadioBox = import.meta.env?.RD_UI_RADIO_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_RADIO_BOX).RadioBox as typeof RadioBoxComponent
  : RadioBoxComponent
