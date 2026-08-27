import { Link } from './Link'

import { render } from '../../render'
import { pushHistory } from '../../utils'

afterEach(() => {
  pushHistory('/')
  document.body.innerHTML = ''
})

describe('Link', () => {
  it('should work without props', async () => {
    render(<Link>home</Link>)

    expect(document.body.innerHTML).toBe('<a>home</a>')
  })

  it('should contain default props on external', async () => {
    render(<Link href='https://cantinc.com'>CANT inc.</Link>)

    expect(document.body.innerHTML)
      .toBe('<a href="https://cantinc.com" rel="noopener noreferrer nofollow" target="_blank">CANT inc.</a>')
  })

  it('should have self class', () => {
    render(
      <Link href='/' class='test'>
        CANT inc.
      </Link>,
    )

    expect(document.body.innerHTML).toBe('<a class="test" href="/">CANT inc.</a>')
  })

  it('should combine class prop', () => {
    render(
      <Link href='/' class={['test1', false, 0, 'test2']}>
        CANT inc.
      </Link>,
    )

    expect(document.body.innerHTML).toBe('<a class="test1 test2" href="/">CANT inc.</a>')
  })

  it('should have active class', async () => {
    render(
      <Link
        href='/'
        exact
        class={{ root: 'test', active: 'active' }}
      >
        CANT inc.
      </Link>,
    )

    expect(document.body.innerHTML).toBe('<a class="test active" href="/">CANT inc.</a>')

    pushHistory('/test')

    expect(document.body.innerHTML).toBe('<a class="test" href="/">CANT inc.</a>')

    pushHistory('/')

    expect(document.body.innerHTML).toBe('<a class="test active" href="/">CANT inc.</a>')
  })

  it('should work with any search', async () => {
    render(
      <Link class={{ root: 'test', active: 'active' }} href='/test?phone=+7%20(999)%20999-99-99'>
        CANT inc.
      </Link>,
    )

    expect(document.body.innerHTML).toBe('<a class="test" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')

    pushHistory('/test?phone=+7%20(999)%20999-99-99')

    expect(document.body.innerHTML).toBe('<a class="test active" href="/test?phone=+7%20(999)%20999-99-99">CANT inc.</a>')
  })
})
