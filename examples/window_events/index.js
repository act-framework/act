import main from '../..'
import { scrollThrottled, breakpoint } from '../../subscriptions/window'
import times from 'ramda/src/times'
import './styles.css'

const view = ({breakpoint, scroll}) => (
  ['div', [
    ['ul', {style: {position: 'fixed', top: 80}}, [
      ['li', ['scroll ', ['b', scroll]]],
      ['li', [
        'breakpoint ',
        ['b', breakpoint],
        ['small', ' (resize window to change)']
      ]]
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

const model = { dimensions: [0, 0], scroll: 0 }

const subscriptions = {
  breakpoint,
  scroll: scrollThrottled
}

const node = document.getElementById('app')
main(view, { model, reducer, subscriptions, node })
