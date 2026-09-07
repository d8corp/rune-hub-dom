import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type MoonIconProps = BaseIconProps

export function MoonIcon (props: MoonIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </BaseIcon>
  )
}
