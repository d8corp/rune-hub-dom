import type { TxtCodeBlockNode } from '@textlint/ast-node-types'

import { Highlight } from '../Highlight/Highlight'
import type { BaseMarkdownProps } from './BaseMarkdown'
import { BaseMarkdown } from './BaseMarkdown'

import { JSXNode } from '../../../types'

export type MarkdownProps = BaseMarkdownProps

export function Markdown ({ text, map, ...props }: MarkdownProps) {
  if (!text) return

  return (
    <BaseMarkdown
      {...props}
      text={text}
      map={{
        ...map,
        CodeBlock: ({ value, lang }: TxtCodeBlockNode) => new JSXNode(Highlight, {
          code: value,
          lang: String(lang),
          glow: props.glow,
        }),
      }}
    />
  )
}
