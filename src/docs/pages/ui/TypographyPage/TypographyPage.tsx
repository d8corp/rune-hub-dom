import type { HighlightExamples } from '@docs/ui'

import { Flex, Markdown, Typography } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TypographyPage.md'

export default function TypographyPage () {
  const markdownText = `This is a paragraph with some text.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Horizontal Rules
___

---

***

### Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

### Blockquotes

> Level 1
>> Level 2
>>> Level 3


### Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


### Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

### Tables

| Option | Description                                                               |
|--------|---------------------------------------------------------------------------|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
|-------:|--------------------------------------------------------------------------:|
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |`

  const examples: HighlightExamples = {
    basic: (
      <Typography>
        <h3>Typography Heading</h3>
        <p>This paragraph is styled by the Typography container, including standard typography rules for text, lists, and quotes.</p>
        <blockquote>A styled blockquote inside the typography wrapper.</blockquote>
      </Typography>
    ),
    markdown: (
      <Typography>
        <Markdown text={markdownText} />
      </Typography>
    ),
    flex: (
      <Flex gap={16}>
        <Typography flex style={{ border: '1px dashed #06f', padding: '12px' }}>
          <h3>Left Column</h3>
          <p>Flexible block with <code>flex</code> set to <code>true</code> (expands to fill available space).</p>
        </Typography>
        <Typography style={{ width: '160px', border: '1px dashed #999', padding: '12px' }}>
          <h3>Right Column</h3>
          <p>Fixed width block (160px).</p>
        </Typography>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
