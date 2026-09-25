import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type SearchIconProps = BaseIconProps

export function SearchIcon (props: SearchIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx='11' cy='11' r='7' />
      <path d='m20 20-3.5-3.5' />
    </BaseIcon>
  )
}
