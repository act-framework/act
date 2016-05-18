import { valueOnEnter } from '../../src/processes'

const view = (value) => (
  ['.counter', [
    ['h1', value],
    ['input', {keyup: {update: valueOnEnter}}]
  ]]
)

export const model = ''

export const reducer = (state, {type, payload}) => {
  if (type === 'update') {
    return payload
  }

  return state
}

export default { view, model, reducer }
