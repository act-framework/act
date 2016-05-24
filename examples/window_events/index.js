import main from '../../src'
import { dimensions, scroll } from '../../src/processes'
import fromEvent from '../../src/signals/sources/fromEvent'
import times from 'ramda/src/times'

const view = ({dimensions, scroll}) => (
  ['div', [
    ['ul', {style: {position: 'fixed'}}, [
      ['li', ['dimensions ', dimensions[0], 'x', dimensions[1]]],
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
      return {...state, dimensions: payload}
    default:
      return state
  }
}

const model = { dimensions: [0, 0], scroll: 0 }

const subscriptions = {
  resize: dimensions(fromEvent(window, 'resize').start()),
  scroll: scroll(fromEvent(window, 'scroll').start())
}

main(view, model, reducer, { subscriptions })
