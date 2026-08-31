import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type TypeScriptIconProps = BaseIconProps

export function TypeScriptIcon (props: TypeScriptIconProps) {
  return (
    <BaseIcon {...props}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        <path d='M14 2V8H20' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        <path d='M9 14H12' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        <path d='M10.5 14V19' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        <path d='M16.1762 14.3699C15.1575 13.5497 14 14.2272 14 15.1035C14 15.9799 14.3616 16.4789 15.195 16.4789C16.0283 16.4789 16.4945 16.8806 16.5 17.7326C16.5 18.6089 15.2848 19.6758 14.1229 18.4372' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
      </svg>
    </BaseIcon>
  )
}
