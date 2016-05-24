import main from '../../src'
import times from 'ramda/src/times'
import { breakpoint, scroll } from '../../src/subscriptions/window'

const view = ({breakpoint, scroll}) => (
  ['main', [
    ['aside', {style: {position: 'fixed'}}, [
      'breakpoint ', breakpoint, ' scroll ', scroll
    ]],
    ...times(() => ['br'], 300)
  ]]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'scroll':
      return {...state, scroll: payload}
    case 'breakpoint':
      return {...state, breakpoint: payload}
    default:
      return state
  }
}

const model = { breakpoint: 'medium', scroll: 0 }

const subscriptions = {
  breakpoint,
  scroll
}

main(view, model, reducer, { subscriptions })
