import main from '../../src'

const counter = (count) => (
  ['main', [
    ['h1', count],
    ['button', {click: {add: 1}}, 'Add 1'],
    ['button', {click: {add: -1}}, 'Remove 1']
  ]]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'add':
      return state + payload
    default:
      return state
  }
}

main(counter, 0, reducer)
