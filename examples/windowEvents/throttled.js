import main from '../../src'
import { width, scroll } from '../../src/processes'
import fromEvent from '../../src/signals/sources/fromEvent'
import times from 'ramda/src/times'
import throttle from '../../src/signals/combinators/throttle'
import map from '../../src/signals/combinators/map'
import distinct from '../../src/signals/combinators/distinct'
import head from 'ramda/src/head'

const view = ({breakpoint, scroll}) => (
  ['div', [
    ['ul', {style: {position: 'fixed'}}, [
      ['li', ['breakpoint ', breakpoint]],
      ['li', ['scroll ', scroll]]
    ]],
    ...times(() => ['br'], 300)
  ]]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'scroll':
      return {...state, scroll: payload}
    case 'resize':
      return {...state, breakpoint: payload}
    default:
      return state
  }
}

const model = { breakpoint: 0, scroll: 0 }

import pipe from '../../src/signals/pipe'

const throttledScroll = pipe(
  throttle(1000),
  scroll
)

const breakpoints = pipe(
  width,
  map((w) => w > 700 ? 'desktop' : 'mobile'),
  distinct
)

const subscriptions = {
  resize: breakpoints(fromEvent(window, 'resize').start()),
  scroll: throttledScroll(fromEvent(window, 'scroll').start())
}

main(view, model, reducer, { subscriptions })
