import main from '../..'
// import history from '../../enhancers/history'
import map from 'ramda/src/map'
import combine from '../../combine'

const view = ({ count, history }) => (
  ['div', [
    ['.counter', [
      ['h1', count],
      ['button', {click: {add: 1}}, 'Add 1'],
      ['button', {click: {add: -1}}, 'Remove 1']
    ]],
    historyView(history)
  ]]
)

const historyView = (history) => (
  ['ol', map(historyItem, history)]
)

const historyItem = (item) => (
  ['li', `${item.type}: ${item.payload}`]
)
// export const model = { count: 0, history: [] }

export const count = (state = 0, {type, payload}) => {
  console.log('count')
  if (type === 'add') {
    return state + payload
  }

  return state
}

const history = (state = [], action) => {
  console.log('history')
  return [...state, action]
}

// const enhancers = [history]

main(view, { reducer: combine({ count, history }) })
