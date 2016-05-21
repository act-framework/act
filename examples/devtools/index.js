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

const historyView = (history) => (
  ['ol', map(historyItem, history)]
)

const historyItem = (item) => (
  ['li', `${item.type}: ${item.payload}`]
)

export const count = (state = 0, {type, payload}) => {
  console.log('count')
  if (type === 'add') {
    return state + payload
  }

  return state
}

main(view, { reducer: count, devtools: true })
