import main from '../../devtools'

const view = (count) => (
  ['div', [
    ['.counter', [
      ['h1', count],
      ['button', {click: {add: 1}}, 'Add 1'],
      ['button', {click: {add: -1}}, 'Remove 1']
    ]]
  ]]
)

export const reducer = (state = 0, {type, payload}) =>
  type === 'add'
    ? state + payload
    : state

main(view, { reducer })
