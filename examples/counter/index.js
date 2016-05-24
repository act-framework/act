import main from '../..'

const counter = (count) => (
  ['main', [
    ['h1', count],
    ['button', {click: {add: 1}}, 'Add 1'],
    ['button', {click: {add: -1}}, 'Remove 1']
  ]]
)

const reducer = (state = 0, {type, payload}) => {
  switch (type) {
    case 'add':
      return state + payload
    default:
      return state
  }
}

main(counter, { reducer })
