import { MarkdownTemplate } from '../../../templates'
import description from './LazyPage.md'

export default function LazyPage () {
  return (
    <MarkdownTemplate text={description} />
  )
}
