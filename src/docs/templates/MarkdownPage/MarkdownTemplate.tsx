import { Typography } from '../../../ui'
import { BasePage, Markdown } from '../../ui'

export interface MarkdownTemplateProps {
  text: string;
}

export function MarkdownTemplate ({ text }: MarkdownTemplateProps) {
  return (
    <BasePage>
      <Typography>
        <Markdown text={text} glow />
      </Typography>
    </BasePage>
  )
}
