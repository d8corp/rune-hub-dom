import type { Child, DomElement, IContent, Parent } from '../../types'

export class Content implements IContent {
  _parent?: Parent
  _prev?: Child
  _next?: Child
  _first?: Child
  _last?: Child
}

function virtualRemove (target: Child) {
  if (!target._parent) return

  if (target instanceof Content) {
    let child = target._first

    if (child) {
      child._prev = target._prev

      while (child) {
        child._parent = target._parent

        if (!child._next) {
          child._next = target._next

          if (target._next) {
            target._next._prev = child
          }

          break
        }

        child = child._next
      }

      if (target._parent._first === target) {
        target._parent._first = target._first
      }

      if (target._parent._last === target) {
        target._parent._last = target._last
      }

      return
    }
  }

  if (target._parent._first === target) {
    target._parent._first = target._next
  }

  if (target._parent._last === target) {
    target._parent._last = target._prev
  }

  if (target._prev) {
    target._prev._next = target._next
  }

  if (target._next) {
    target._next._prev = target._prev
  }

  target._prev = target._next = target._parent = undefined
}

function getParentElement (target: Child): DocumentFragment | DomElement | undefined {
  return target._parent && target._parent instanceof Content ? getParentElement(target._parent) : target._parent
}

function getNextElement (target: Child): DomElement | Text | undefined {
  if (!target._next) {
    return target._parent instanceof Content ? getNextElement(target._parent) : undefined
  }

  if (target._next instanceof Content) {
    if (target._next._first) {
      if (target._next._first instanceof Content) {
        return getNextElement(target._next._first)
      } else {
        return target._next._first instanceof DocumentFragment ? undefined : target._next._first
      }
    }

    return getNextElement(target._next)
  }

  return target._next instanceof DocumentFragment ? undefined : target._next
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

  if (parent instanceof Content) {
    const next = getNextElement(parent)

    if (!next) {
      const parentElement = getParentElement(parent)

      if (parentElement) {
        if (children instanceof Content) {
          parentElement.append(...getElements(children))
        } else {
          parentElement.append(children)
        }
      }

      return
    }

    if (children instanceof Content) {
      next.before(...getElements(children))
    } else {
      next.before(children)
    }
  } else if (children instanceof Content) {
    parent.append(...getElements(children))
  } else {
    parent.append(children)
  }
}
