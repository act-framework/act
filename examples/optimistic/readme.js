import main from '../'
import map from 'ramda/src/map'
import valueOnEnter from '@act/main/processes/valueOnEnter'

const add = (payload, history) =>
  history.push({ type: 'success', payload }, (rollback) =>
    setTimeout(rollback, 5000))

const view = (comments) =>
  ['main', [
    ['input', { keyup: [add, valueOnEnter], value: '' }],
    ...map((comment) => ['div', comment], comments)
  ]]

const reducer = (state = [], {type, payload}) =>
  type === 'success' ? [...state, payload] : state

main(view, { reducer })
