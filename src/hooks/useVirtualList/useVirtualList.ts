import { useEffect } from '../useEffect'

import type { ObservableProp } from '../../types'
import { Ref, SystemSlot, use } from '../../utils'

export const documentElementRef = new Ref(document.documentElement)

export interface VirtualListParams<T = any> {
  itemHeight: number
  list: ObservableProp<T[]>
  gap?: number
  scrollbar?: Ref<HTMLElement>
}

export function useVirtualList<T> ({ scrollbar = documentElementRef, itemHeight, gap = 0, list }: VirtualListParams<T>) {
  const itemSize = itemHeight + gap
  const virtualScroll = () => 0
  const virtualHeight = () => 0
  const virtualHeightCount = () => (height.value / itemSize) | 0
  const virtualScrollIndex = () => Math.max(0, Math.min((scroll.value / itemSize) | 0, use(list).length - heightCount.value))
  const virtualOffset = () => Math.max(0, scrollIndex.value * itemSize)
  const virtualOffsetTop = () => `${Math.max(0, offset.value)}px`
  const virtualOffsetBottom = () => `${Math.max(0, (use(list).length * itemSize) - offset.value - height.value - itemSize)}px`

  const scroll = new SystemSlot(virtualScroll)
  const height = new SystemSlot(virtualHeight)
  const heightCount = new SystemSlot(virtualHeightCount)
  const scrollIndex = new SystemSlot(virtualScrollIndex)
  const offset = new SystemSlot(virtualOffset)
  const offsetTop = new SystemSlot(virtualOffsetTop)
  const offsetBottom = new SystemSlot(virtualOffsetBottom)

  const virtualList = new SystemSlot(function virtualList () {
    return use(list).slice(scrollIndex.value, scrollIndex.value + heightCount.value + 2)
  })

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      height.set(entry.target.clientHeight)
    }
  })

  useEffect(() => {
    const element = scrollbar.value

    if (!element) return

    const listener = () => {
      scroll.set(element.scrollTop)
    }

    element.addEventListener('scroll', listener)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      element.removeEventListener('scroll', listener)
    }
  })

  return {
    scroll,
    height,
    heightCount,
    scrollIndex,
    offset,
    offsetTop,
    offsetBottom,
    virtualList,
    resizeObserver,
  }
}
