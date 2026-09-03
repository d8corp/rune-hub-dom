import { Markdown } from '../Markdown'
import { DelayPage } from '../Page'
import { Typography } from '../Typography'

export interface MarkdownPageProps {
  text: string;
}

export function MarkdownPage ({ text }: MarkdownPageProps) {
  return (
    <DelayPage>
      <Typography>
        <Markdown text={text} glow />
      </Typography>
    </DelayPage>
  )
}
