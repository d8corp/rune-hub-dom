import { getAsideTimeline } from '@docs/state'
import { Title } from '@docs/ui'
import { slugify } from '@docs/utils'
import type { TxtCodeBlockNode, TxtHeaderNode, TxtNode } from '@textlint/ast-node-types'

import type { HighlightExamples } from '../Highlight/Highlight'
import { Highlight } from '../Highlight/Highlight'

import type { ObservableProp } from '../../../types'
import { JSXNode } from '../../../types'
import type { MarkdownProps } from '../../../ui'
import { Code, Divider, Markdown } from '../../../ui'

export interface DocMarkdownProps extends MarkdownProps {
  examples?: HighlightExamples
  glow?: ObservableProp<boolean>
}

export function DocMarkdown ({ text, map, glow, ...props }: DocMarkdownProps) {
  if (!text) return

  return (
    <Markdown
      {...props}
      text={text}
      map={{
        Document: ({ children }, render) => {
          if (!children) return []

          const sections: any[] = []
          let currentSectionChildren: TxtNode[] = []
          let currentSectionId: string | undefined

          const pushCurrentSection = () => {
            if (currentSectionChildren.length > 0) {
              if (currentSectionId) {
                const timelineName = getAsideTimeline(currentSectionId)

                sections.push(
                  new JSXNode('section', {
                    style: { 'view-timeline': `${timelineName} block` },
                    children: currentSectionChildren.map(child => render(child, render)),
                  }),
                )
              } else {
                sections.push(...currentSectionChildren.map(child => render(child, render)))
              }
            }
          }

          children.forEach((node) => {
            if (node.type === 'Header' && (node as TxtHeaderNode).depth === 2) {
              pushCurrentSection()

              const headerText = (node as TxtHeaderNode).children
                ?.map((c: any) => c.value || '')
                .join('') || ''

              currentSectionId = slugify(headerText)
              currentSectionChildren = [node]
            } else {
              currentSectionChildren.push(node)
            }
          })

          pushCurrentSection()

          return sections
        },
        HorizontalRule: () => new JSXNode(Divider, { glow }),
        Header: ({ children, depth }, render) => {
          const jsxChildren = children?.map(child => render(child, render))
          const text = jsxChildren?.length === 1 && typeof jsxChildren[0] === 'string' ? jsxChildren[0] : undefined

          return new JSXNode(Title, { h: depth, title: text, children: text ? undefined : jsxChildren, link: depth < 3 })
        },
        Code: ({ value }) => new JSXNode(Code, {
          children: value,
        }),
        CodeBlock: ({ value, lang }: TxtCodeBlockNode) => new JSXNode(Highlight, {
          code: value,
          lang: String(lang),
          glow,
          examples: props.examples,
        }),
        ...map,
      }}
    />
  )
}
