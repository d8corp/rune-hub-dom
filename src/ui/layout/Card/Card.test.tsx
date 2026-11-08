import { CardContent } from '../CardContent'
import { CardDescription } from '../CardDescription'
import { CardPreview } from '../CardPreview'
import { CardTitle } from '../CardTitle'
import { Card } from './Card'

import { rundom } from '../../../rundom'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Card', () => {
  it('should render content', () => {
    rundom(<Card>Card content</Card>)

    expect(document.body.innerHTML).toBe('<div style="flex-direction: column;">Card content</div>')
  })

  it('should compose with card parts', () => {
    rundom(
      <Card>
        <CardPreview>
          <span>Preview</span>
        </CardPreview>
        <CardContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardContent>
      </Card>,
    )

    expect(document.body.innerHTML)
      .toBe('<div style="flex-direction: column;"><div><span>Preview</span></div><div style="flex-direction: column;"><div>Title</div><div>Description</div></div></div>')
  })
})
