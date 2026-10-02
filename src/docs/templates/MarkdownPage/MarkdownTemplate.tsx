import { Typography } from '../../../ui'
import { DocMarkdown, type HighlightExamples, Page } from '../../ui'

export interface MarkdownTemplateProps {
  text: string;
  examples?: HighlightExamples
}

export function MarkdownTemplate ({ text, examples }: MarkdownTemplateProps) {
  return (
    <Page>
      <Typography>
        <DocMarkdown text={text} glow examples={examples} />
      </Typography>
    </Page>
  )
}
