import { Pipe } from './Pipe'

import { rundom } from '../../rundom'

describe('Pipe', () => {
  it('should work', () => {
    rundom(
      <Pipe>
        {(children, deep) => deep < 5 ? <div>{deep}{children}</div> : null}
      </Pipe>,
    )

    expect(document.body.innerHTML).toBe('<div>0<div>1<div>2<div>3<div>4</div></div></div></div></div>')
  })
})
