import { batch, Slot, unwatch } from 'rune-hub'

import { parentContext } from '../../constants'
import { useOnce, useParentSlot } from '../../hooks'
import { render } from '../../render'
import { type ObservableProp } from '../../types'
import type { ContextData } from '../../utils'
import {
  after,
  append,
  before, Content, Context,
  lcs,
  observablePropToRuneProp,
  prepend,
  remove,
} from '../../utils'

export const forIndexContext = new Context<Slot<number> | undefined>(undefined)
export const forValueContext = new Context<Slot | undefined>(undefined)

const watcherContext = new Context<Slot | undefined>(undefined)

function getKey (key: any, value: any) {
  if (typeof key === 'function') {
    return key(value)
  } else if (key === undefined) {
    return value
  } else {
    return value[key]
  }
}

type GetType<O extends ObservableProp<Iterable<any>>> = O extends ObservableProp<Iterable<infer T>> ? T : never

export interface ForProps<O extends ObservableProp<Iterable<any>>> {
  of: O
  key?: keyof GetType<O> | ((item: GetType<O>) => any)
  children?: (value: O extends Iterable<GetType<O>> ? GetType<O> : Slot<GetType<O>>, index: O extends Iterable<GetType<O>> ? number : Slot<number>) => JSX.Element
}

export function For<O extends ObservableProp<Iterable<any>>> ({
  key,
  of: ofPropRaw,
  children,
}: ForProps<O>) {
  if (!children || !ofPropRaw) return

  const ofProp = observablePropToRuneProp(ofPropRaw)

  if (typeof ofProp !== 'function') return Array.from(ofProp).map<JSX.Element>(children as any)

  let keysList: any[] = []
  const handlersMap = new Map<any, ContextData>()

  useOnce('clear', () => {
    handlersMap.forEach((data) => watcherContext.get(data)?.destroy())
  })

  return () => {
    const values = ofProp()
    const childHandler = Context.current
    const mainComment = parentContext.get(childHandler)!

    if (!useParentSlot()!.inited) {
      let index = 0

      for (const value of values) {
        const valueKey = getKey(key, value)

        if (handlersMap.has(valueKey)) continue

        keysList.push(valueKey)

        const deepHandler = Context.nest()
        const deepContent = new Content()
        parentContext.set(deepContent, deepHandler)
        append(parentContext.get(), deepContent)
        const currentIndex = index++
        const indexState = new Slot(() => currentIndex)
        const valueState = new Slot(() => value)

        forValueContext.set(valueState, deepHandler)
        forIndexContext.set(indexState, deepHandler)
        handlersMap.set(valueKey, deepHandler)

        const deepRender = Context.use(render, deepHandler)

        watcherContext.set(unwatch(() => {
          const result = new Slot(() => {
            deepRender(children(valueState as any, indexState as any))
          })

          result.on()

          return result
        }), deepHandler)
      }

      return
    }

    const oldKeysList = keysList
    const oldKeysSet = new Set(oldKeysList)
    keysList = []

    for (const value of values) {
      keysList.push(getKey(key, value))
    }

    const keepKeys = new Set(lcs(oldKeysList, keysList))

    let i = 0

    for (const value of values) {
      const index = i++
      const valueKey = keysList[index]

      if (handlersMap.has(valueKey)) {
        const keep = keepKeys.has(valueKey)
        const deepHandler = handlersMap.get(valueKey)!

        batch(() => {
          forValueContext.get(deepHandler)!.set(value)
          forIndexContext.get(deepHandler)!.set(index)
        })

        if (!keep) {
          const comment = parentContext.get(deepHandler)

          if (index) {
            after(parentContext.get(handlersMap.get(keysList[index - 1])), comment)
          } else if (oldKeysList.length) {
            before(parentContext.get(handlersMap.get(oldKeysList[0])), comment)
          } else {
            prepend(mainComment, comment)
          }
        }
      } else {
        const comment = new Content()
        const deepHandler = Object.create(childHandler)
        parentContext.set(comment, deepHandler)
        const valueState = new Slot(() => value)
        const indexState = new Slot(() => index)

        forValueContext.set(valueState, deepHandler)
        forIndexContext.set(indexState, deepHandler)
        handlersMap.set(valueKey, deepHandler)

        if (index) {
          after(parentContext.get(handlersMap.get(keysList[index - 1])), comment)
        } else if (oldKeysList.length) {
          before(parentContext.get(handlersMap.get(oldKeysList[0])), comment)
        } else {
          prepend(mainComment, comment)
        }

        const deepRender = Context.use(render, deepHandler)

        watcherContext.set(unwatch(() => {
          const result = new Slot(() => {
            deepRender(children(valueState as any, indexState as any))
          })

          result.on()

          return result
        }), deepHandler)
      }

      oldKeysSet.delete(valueKey)
    }

    oldKeysSet.forEach(valueKey => {
      const deepHandler = handlersMap.get(valueKey)!
      handlersMap.delete(valueKey)
      remove(parentContext.get(deepHandler))
      watcherContext.get(deepHandler)!.destroy()
    })
  }
}
