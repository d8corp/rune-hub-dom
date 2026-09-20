import { Typography } from '../../../ui'
import { Markdown, Page } from '../../ui'

export interface MarkdownTemplateProps {
  text: string;
}

export function MarkdownTemplate ({ text }: MarkdownTemplateProps) {
  return (
    <Page>
      <Typography>
        <Markdown text={text} glow />
      </Typography>
    </Page>
  )
}
