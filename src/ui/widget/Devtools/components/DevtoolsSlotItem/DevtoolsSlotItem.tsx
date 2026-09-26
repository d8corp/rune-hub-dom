import { classes } from 'html-classes'
import type { Slot } from 'rune-hub'

import { SlotStatus } from '../SlotStatus'

import type { HTMLStyleProps } from '../../../../../hooks'
import { useStyles } from '../../../../../hooks'
import type { Merge } from '../../../../../types'
import { addCSS, stringify } from '../../../../../utils'
import { devtoolsStoreContext } from '../../hooks'

if (import.meta.env?.RD_THEME_DEVTOOLS_SLOT_ITEM) {
  addCSS(import.meta.env.RD_THEME_DEVTOOLS_SLOT_ITEM, 'devtools-slot-item')
}

export const devtoolsSlotItemStyles = {
  root: import.meta.env?.RD_THEME_DEVTOOLS_SLOT_ITEM__ROOT,
  selected: import.meta.env?.RD_THEME_DEVTOOLS_SLOT_ITEM__SELECTED,
  value: import.meta.env?.RD_THEME_DEVTOOLS_SLOT_ITEM__VALUE,
}

export type DevtoolsSlotItemStyles = typeof devtoolsSlotItemStyles

export type DevtoolsSlotItemProps = Merge<HTMLStyleProps<HTMLDivElement, DevtoolsSlotItemStyles>, {
  slot: Slot<Slot>
}>

export function DevtoolsSlotItemComponent ({ slot, ...props }: DevtoolsSlotItemProps) {
  const styles = useStyles(devtoolsSlotItemStyles, props.class)
  const { selected, values } = devtoolsStoreContext.get()!

  const handleClick = () => {
    selected.set(slot.value)
  }

  return (
    <div class={() => classes([styles.root, selected.value === slot.value && styles.selected])} onclick={handleClick}>
      <SlotStatus slot={slot} />
      <strong>{() => `${slot.value.rune.name || '—'}:`}</strong>
      <div class={styles.value}>
        {() => ` ${stringify(values.value.get(slot.value))}`}
      </div>
    </div>
  )
}

export const DevtoolsSlotItem = import.meta.env?.RD_UI_DEVTOOLS_SLOT_ITEM
  ? import.meta.require?.(import.meta.env.RD_UI_DEVTOOLS_SLOT_ITEM).DevtoolsSlotItem as typeof DevtoolsSlotItemComponent
  : DevtoolsSlotItemComponent
