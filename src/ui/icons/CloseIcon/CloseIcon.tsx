import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type CloseIconProps = BaseIconProps

export function CloseIcon (props: CloseIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M18 6L6 18' />
      <path d='M6 6l12 12' />
    </BaseIcon>
  )
}
