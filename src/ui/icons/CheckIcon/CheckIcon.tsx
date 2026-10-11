import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type CheckIconProps = BaseIconProps

export function CheckIcon (props: CheckIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M5 12.5l4.5 4.5L19 7.5' />
    </BaseIcon>
  )
}
