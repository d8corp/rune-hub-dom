import { MarkdownTemplate } from '../../templates'
import description from './HidePage.md'

export default function HidePage () {
  return (
    <MarkdownTemplate text={description} />
  )
}
