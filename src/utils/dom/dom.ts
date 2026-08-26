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

  realRemove(target)
}

function realRemove (target: Child) {
  if (!target._parent) return

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
  let parent: Parent | undefined = target._parent

  while (parent instanceof Content) {
    parent = parent._parent
  }

  return parent
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

function getPrevElement (target: Child): DomElement | Text | undefined {
  if (!target._prev) {
    return target._parent instanceof Content ? getPrevElement(target._parent) : undefined
  }

  if (target._prev instanceof Content) {
    if (target._prev._last) {
      if (target._prev._last instanceof Content) {
        return getPrevElement(target._prev._last)
      } else {
        return target._prev._last instanceof DocumentFragment ? undefined : target._prev._last
      }
    }

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

export function append (parent: Parent, target: Parent) {
  if (target._parent) {
    realRemove(target)
  }

  target._parent = parent

  if (!parent._first) {
    parent._first = target
  }

  if (parent._last) {
    parent._last._next = target
    target._prev = parent._last
  }

  parent._last = target

  if (parent instanceof Content) {
    const next = getNextElement(parent)

    if (!next) {
      const parentElement = getParentElement(parent)

      if (parentElement) {
        if (target instanceof Content) {
          parentElement.append(...getElements(target))
        } else {
          parentElement.append(target)
        }
      }

      return
    }

    if (target instanceof Content) {
      next.before(...getElements(target))
    } else {
      next.before(target)
    }
  } else if (target instanceof Content) {
    parent.append(...getElements(target))
  } else {
    parent.append(target)
  }
}

export function prepend (parent: Parent, target: Parent) {
  if (target._parent) {
    realRemove(target)
  }

  target._parent = parent

  if (!parent._last) {
    parent._last = target
  }

  if (parent._first) {
    parent._first._prev = target
    target._next = parent._first
  }

  parent._first = target

  if (parent instanceof Content) {
    const prev = getPrevElement(parent)

    if (!prev) {
      const parentElement = getParentElement(parent)

      if (parentElement) {
        if (target instanceof Content) {
          parentElement.prepend(...getElements(target))
        } else {
          parentElement.prepend(target)
        }
      }

      return
    }

    if (target instanceof Content) {
      prev.after(...getElements(target))
    } else {
      prev.after(target)
    }
  } else if (target instanceof Content) {
    parent.prepend(...getElements(target))
  } else {
    parent.prepend(target)
  }
}

export function after (node: Child, target: Parent) {
  if (target._parent) {
    realRemove(target)
  }

  target._parent = node._parent

  if (node._next) {
    node._next._prev = target
    target._next = node._next
  }

  node._next = target
  target._prev = node

  const prev = getPrevElement(target)

  if (!prev) return

  if (target instanceof Content) {
    prev.after(...getElements(target))
  } else {
    prev.after(target)
  }
}

export function before (node: Child, target: Parent) {
  if (target._parent) {
    realRemove(target)
  }

  target._parent = node._parent

  if (node._prev) {
    node._prev._next = target
    target._prev = node._prev
  }

  node._prev = target
  target._next = node

  const next = getNextElement(target)

  if (!next) return

  if (target instanceof Content) {
    next.before(...getElements(target))
  } else {
    next.before(target)
  }
}
