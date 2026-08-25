import type { Child, DomElement, IContent, Parent } from '../../types'

export class Content implements IContent {
  _parent?: Parent
  _prev?: Child
  _next?: Child
  _first?: Child
  _last?: Child
}

function virtualRemove (target: Child) {
  if (target._parent) {
    if (target._parent._first === target) {
      target._parent._first = target._next
    }

    if (target._parent._last === target) {
      target._parent._last = target._prev
    }
  }

  if (target._prev) {
    target._prev._next = target._next
  }

  if (target._next) {
    target._next._prev = target._prev
  }

  target._prev = target._next = target._parent = undefined
}

function getPrevElement (target: Child): DomElement | Text | undefined {
  if (!target._prev) {
    return target._parent instanceof Content ? getPrevElement(target._parent) : undefined
  }

  if (target._prev instanceof Content) {
    return getPrevElement(target._prev)
  }

  return target._prev instanceof DocumentFragment ? undefined : target._prev
}

function getElements (target: Content) {
  const result: Array<DomElement | Text> = []

  let current = target._first

  while (current) {
    if (current instanceof Content) {
      const insert = getElements(current)

      if (insert.length) {
        result.push(...insert)
      }
    } else if (current instanceof DocumentFragment) {
      throw Error('Fragment detected in tree')
    } else {
      result.push(current)
    }

    current = current._next
  }

  return result
}

export function remove (target: Child) {
  virtualRemove(target)

  if (!(target instanceof Content) && !(target instanceof DocumentFragment)) {
    target.remove()
  }
}

export function append (parent: Parent, children: Parent) {
  if (children._parent) {
    virtualRemove(children)
  }

  children._parent = parent

  if (!parent._first) {
    parent._first = children
  }

  if (parent._last) {
    parent._last._next = children
    children._prev = parent._last
  }

  parent._last = children

  if (parent instanceof Content || children instanceof Content) {
    const prev = getPrevElement(children)

    if (!prev) return

    if (children instanceof Content) {
      prev.after(...getElements(children))
    } else {
      prev.after(children)
    }
  } else {
    parent.appendChild(children)
  }
}
