export function stringify (data: any): string {
  if (typeof data === 'string') return `"${data}"`
  if (data === null) return 'null'
  if (typeof data === 'function') return `Function<${data.name}>`
  if (Array.isArray(data)) return `[${data.map(stringify).join(', ')}]`
  if (data instanceof Set) return `Set<${stringify(Array.from(data))}>`
  if (data instanceof Map) return `Map<${stringify(Array.from(data))}>`
  if (data instanceof RegExp) return `RegExp<"${data.source}">`

  if (typeof data === 'object') {
    return `{ ${Object.keys(data).map(key => `${/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`}: ${stringify(data[key])}`).join(', ')} }`
  }

  return String(data)
}
