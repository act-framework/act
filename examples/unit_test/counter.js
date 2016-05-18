const view = (count) => (
  ['.counter', [
    ['h1', count],
    ['button', {click: {add: 1}}, 'Add 1'],
    ['button', {click: {add: -1}}, 'Remove 1']
  ]]
)

export const model = 0

export const reducer = (state, {type, payload}) => {
  if (type === 'add') {
    return state + payload
  }

  return state
}

export default { view, model, reducer }
