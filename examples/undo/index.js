import main from '../..'

// suggestion:
// import call from 'ramda/src/call'
// import prop from 'ramda/src/prop'
// import compose from 'ramda/src/compose'
// const undo = compose(call, prop('undo'))
// const redo = compose(call, prop('redo'))

const undo = (history) => {
  history.undo()
}

const redo = (history) => {
  history.redo()
}

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

export const reducer = (state = 0, {type, payload}) =>
  type === 'add'
    ? state + payload
    : state

main(view, { reducer })
