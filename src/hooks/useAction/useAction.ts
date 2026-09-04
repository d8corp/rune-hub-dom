import type { Fn } from 'rune-hub'
import { Hub } from 'rune-hub'

/**
 * The hook automatically binds your action to context Hub, ensuring all Rune mutations
 * triggered inside the action are tracked within the same Hub instance.
 *
 * @template T - The action function type
 * @param action - The action function to bind to the Hub
 * @returns A stable callback that executes the action in the Hub context
 * @see {@link https://d8corp.github.io/rundom/use-action}
 *
 * @example
 * ```tsx
 * const count = () => 0
 * const increment = () => slot(count).value++
 *
 * function Counter () {
 *   const inc = useAction(increment)
 *
 *   return <button onClick={inc}>Count: {slot(count)}</button>
 * }
 * ```
 */
export function useAction <T extends Fn> (action: T): T {
  const hub = Hub.cur || Hub.root

  return ((...args: any[]) => hub.use(() => action(...args))) as T
}
