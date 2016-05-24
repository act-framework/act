import main from '../..'
import map from 'ramda/src/map'

const view = (count) => (
  ['div', [
    ['.counter', [
      ['h1', count],
      ['button', {click: {add: 1}}, 'Add 1'],
      ['button', {click: {add: -1}}, 'Remove 1']
    ]]
  ]]
)

export const count = (state = 0, {type, payload}) =>
  type === 'add'
    ? state + payload
    : state

const { history } = main(view, { reducer: count, devtools: true })

const devtools = (history) => (
  ['ol', map(historyItem, history)]
)

const historyItem = (item) => (
  ['li', `${item.type}: ${item.payload}`]
)

const subscriptions = {
  change: history.subscribe()
}

main(devtools, {
  node: document.getElementById('devtools'),
  model: [],
  subscriptions
})
