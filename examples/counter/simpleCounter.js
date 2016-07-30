import main from '../..'

const counter = (count) => (
  ['main', [
    ['h1', count],
    ['button', {click: 'inc'}, 'Increment'],
    ['button', {click: 'dec'}, 'Decrement']
  ]]
)

const reducer = (state = 0, {type, payload}) => {
  switch (type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return state
  }
}

main(counter, { reducer })
