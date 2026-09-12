import type {
  ASTNodeTypes,
  TxtBlockQuoteNode,
  TxtCodeBlockNode,
  TxtCodeNode,
  TxtDeleteNode,
  TxtDocumentNode,
  TxtEmphasisNode,
  TxtHeaderNode,
  TxtImageNode,
  TxtLinkNode,
  TxtListItemNode,
  TxtListNode,
  TxtNode,
  TxtParagraphNode,
  TxtStrongNode,
  TxtTableNode,
  TxtTextNode,
} from '@textlint/ast-node-types'
import { parse } from '@textlint/markdown-to-ast'

import { Code } from '../Code'
import { Divider } from '../Divider'
import { Title } from '../Title'

import type { ObservableProp } from '../../../types'
import { JSXNode } from '../../../types'
import { Link } from '../../../ui'
import { use } from '../../../utils'
import { getAsideTimeline } from '../../state'
import { slugify } from '../../utils'

export interface BaseMarkdownProps {
  text?: ObservableProp<string>
  map?: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>>
  glow?: ObservableProp<boolean>
}

export function BaseMarkdown ({ text, map, glow }: BaseMarkdownProps) {
  const ast2jsx = (ast: TxtNode) => {
    return currentMap[ast.type as ASTNodeTypes]?.(ast)
  }

  const currentMap: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>> = {
    Document: ({ children }: TxtDocumentNode) => {
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
                children: currentSectionChildren.map(ast2jsx),
              }),
            )
          } else {
            sections.push(...currentSectionChildren.map(ast2jsx))
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
    Paragraph: ({ children }: TxtParagraphNode) => new JSXNode('p', {
      children: children?.map(ast2jsx),
    }),
    Str: ({ value }: TxtTextNode) => value,
    Link: ({ url, children }: TxtLinkNode) => new JSXNode(Link, {
      href: url,
      children: children?.map(ast2jsx),
    }),
    List: ({ children, ordered }: TxtListNode) => new JSXNode(ordered ? 'ol' : 'ul', {
      children: children?.map(ast2jsx),
    }),
    ListItem: ({ children }: TxtListItemNode) => new JSXNode('li', {
      children: children?.map(ast2jsx),
    }),
    Header: ({ children, depth }: TxtHeaderNode) => {
      const jsxChildren = children?.map(ast2jsx)
      const text = jsxChildren?.length === 1 && typeof jsxChildren[0] === 'string' ? jsxChildren[0] : undefined

      return new JSXNode(Title, { h: depth, title: text, children: text ? undefined : jsxChildren, link: depth < 3 })
    },
    HorizontalRule: () => new JSXNode(Divider, { glow }),
    Strong: ({ children }: TxtStrongNode) => new JSXNode('strong', {
      children: children?.map(ast2jsx),
    }),
    Emphasis: ({ children }: TxtEmphasisNode) => new JSXNode('em', {
      children: children?.map(ast2jsx),
    }),
    Delete: ({ children }: TxtDeleteNode) => new JSXNode('s', {
      children: children?.map(ast2jsx),
    }),
    BlockQuote: ({ children }: TxtBlockQuoteNode) => new JSXNode('blockquote', {
      children: children?.map(ast2jsx),
    }),
    Code: ({ value }: TxtCodeNode) => new JSXNode(Code, {
      children: value,
      glow,
    }),
    CodeBlock: ({ value }: TxtCodeBlockNode) => new JSXNode('pre', {
      children: value,
    }),
    Image: ({ alt, url }: TxtImageNode) => new JSXNode('img', {
      alt,
      src: url,
    }),
    Break: () => new JSXNode('br', {}),
    Table: ({ children: [header, ...rows] }: TxtTableNode) => new JSXNode('table', {
      children: [
        new JSXNode('thead', {
          children: [new JSXNode('tr', {
            children: header.children.map(({ children }) => new JSXNode('th', {
              children: children?.map(ast2jsx),
            })),
          })],
        }),
        new JSXNode('tbody', {
          children: rows?.map(({ children }) => new JSXNode('tr', {
            children: children.map(({ children }) => new JSXNode('td', {
              children: children?.map(ast2jsx),
            })),
          })),
        }),
      ],
    }),
    ...map,
  }

  if (!text) return

  if (typeof text === 'string') {
    return ast2jsx(parse(text))
  }

  return () => ast2jsx(parse(use(text)))
}
