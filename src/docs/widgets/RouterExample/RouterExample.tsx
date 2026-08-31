import { Example } from '../../components'
import text from './RouterExample.md'

export function RouterExample () {
  return (
    <Example
      description={text}
      views={[
        { title: '/', children: 'Home Page' },
        { title: '/about', children: 'About Page' },
        { title: '/rest', children: 'NotFound Page' },
      ]}
    />
  )
}
