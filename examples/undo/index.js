import main from '../..'
import TraversableHistory from '../../internals/TraversableHistory'

const undo = (_, history) =>
  history.undo()

const redo = (_, history) =>
  history.redo()

const view = (count) => (
  ['div', [
    ['.counter', [
      ['h1', count],
      ['button', {click: {add: 1}}, 'Add 1'],
      ['button', {click: {add: -1}}, 'Remove 1'],
      ['button', {click: undo}, 'Undo'],
      ['button', {click: redo}, 'Redo']
    ]]
  ]]
)

export const reducer = (state, {type, payload}) =>
  type === 'add'
    ? state + payload
    : state

main(view, { reducer, model: 0, historyClass: TraversableHistory })
