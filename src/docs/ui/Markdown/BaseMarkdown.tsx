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
import { Link } from '../Link'
import { Title } from '../Title'

import type { ObservableProp } from '../../../types'
import { JSXNode } from '../../../types'
import { use } from '../../../utils'

export interface BaseMarkdownProps {
  text?: ObservableProp<string>
  map?: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>>
}

export function BaseMarkdown ({ text, map }: BaseMarkdownProps) {
  const ast2jsx = (ast: TxtNode) => {
    return currentMap[ast.type as ASTNodeTypes]?.(ast)
  }

  const currentMap: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>> = {
    Document: ({ children }: TxtDocumentNode) => children.map(ast2jsx),
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
    HorizontalRule: () => new JSXNode(Divider, {}),
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
