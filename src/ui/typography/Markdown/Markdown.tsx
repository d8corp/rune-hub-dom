import type { AnyTxtNode, ASTNodeTypes, TypeofTxtNode } from '@textlint/ast-node-types'
import { parse } from '@textlint/markdown-to-ast'

import type { ObservableProp } from '../../../types'
import { JSXNode } from '../../../types'
import { use } from '../../../utils'
import { Link } from '../../primitive'

export type MarkdownMapKey = AnyTxtNode['type']
export type MarkdownMapNode<K extends MarkdownMapKey> = TypeofTxtNode<typeof ASTNodeTypes[K]>
export type MarkdownRender<T extends AnyTxtNode = AnyTxtNode> = (node: T, render: MarkdownRender) => JSX.Element

export type MarkdownMap = {
  [K in MarkdownMapKey]?: MarkdownRender<MarkdownMapNode<K>>
}

export const markdownMap = {
  Document: ({ children }, render) => children?.map(child => render(child, render)),
  Paragraph: ({ children }, render) => new JSXNode('p', {
    children: children?.map(child => render(child, render)),
  }),
  Str: ({ value }) => value,
  Link: ({ url, children }, render) => new JSXNode(Link, {
    href: url,
    children: children?.map(child => render(child, render)),
  }),
  List: ({ children, ordered }, render) => new JSXNode(ordered ? 'ol' : 'ul', {
    children: children?.map(child => render(child, render)),
  }),
  ListItem: ({ children }, render) => new JSXNode('li', {
    children: children?.map(child => render(child, render)),
  }),
  Header: ({ children, depth }, render) => new JSXNode(`h${depth}`, {
    children: children?.map(child => render(child, render)),
  }),
  HorizontalRule: () => new JSXNode('hr', {}),
  Strong: ({ children }, render) => new JSXNode('strong', {
    children: children?.map(child => render(child, render)),
  }),
  Emphasis: ({ children }, render) => new JSXNode('em', {
    children: children?.map(child => render(child, render)),
  }),
  Delete: ({ children }, render) => new JSXNode('s', {
    children: children?.map(child => render(child, render)),
  }),
  BlockQuote: ({ children }, render) => new JSXNode('blockquote', {
    children: children?.map(child => render(child, render)),
  }),
  Code: ({ value }) => new JSXNode('code', {
    children: value,
  }),
  CodeBlock: ({ value }) => new JSXNode('pre', {
    children: value,
  }),
  Image: ({ alt, url }) => new JSXNode('img', {
    alt,
    src: url,
  }),
  Break: () => new JSXNode('br', {}),
  Table: ({ children: [header, ...rows], align }, render) => new JSXNode('table', {
    children: [
      new JSXNode('thead', {
        children: [new JSXNode('tr', {
          children: header.children.map(({ children }, index) => new JSXNode('th', {
            style: {
              'text-align': align?.[index],
            },
            children: children?.map(child => render(child, render)),
          })),
        })],
      }),
      new JSXNode('tbody', {
        children: rows?.map(({ children }) => new JSXNode('tr', {
          children: children.map(({ children }, index) => new JSXNode('td', {
            style: {
              'text-align': align?.[index],
            },
            children: children?.map(child => render(child, render)),
          })),
        })),
      }),
    ],
  }),
} satisfies MarkdownMap

export interface MarkdownProps {
  text?: ObservableProp<string>
  map?: MarkdownMap
}

export function Markdown ({ text, map }: MarkdownProps) {
  if (!text) return

  const currentMap: MarkdownMap = {
    ...markdownMap,
    ...map,
  }

  const render = (ast: AnyTxtNode) => {
    return currentMap[ast.type]?.(ast as any, render)
  }

  if (typeof text === 'string') {
    return render(parse(text))
  }

  return () => render(parse(use(text)))
}
