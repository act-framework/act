import main from '../../src'
import map from 'ramda/src/map'
import addIndex from 'ramda/src/addIndex'
import lensIndex from 'ramda/src/lensIndex'
import over from 'ramda/src/over'
import add from 'ramda/src/add'

const mapIndexed = addIndex(map)

const counter = (count, index) => (
  ['.counter', [
    ['h1', count],
    ['button', {click: {add: {index, amount: 1}}}, 'Add 1'],
    ['button', {click: {add: {index, amount: -1}}}, 'Remove 1']
  ]]
)

const view = (counters) => (
  ['main', [
    ['button', {click: {addCounter: true}}, 'Add counter'],
    ['button', {click: {removeCounter: true}}, 'Remove counter'],
    ['ol', mapIndexed(counter, counters)]
  ]]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'addCounter':
      return [...state, 0]
    case 'removeCounter':
      const [, ...counters] = state
      return counters
    case 'add':
      return over(lensIndex(payload.index), add(payload.amount), state)
  }
  return state
}

const model = []

main(view, model, reducer)
