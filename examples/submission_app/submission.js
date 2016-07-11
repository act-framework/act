import confirm from './confirm'
import nest from 'main/nest'
import value from 'main/processes/value'

const view = (state) =>
  ['div', [
    ['input', {value: state.field, keyup: {setField: value}}],
    nest.view('confirm', confirm.view(state.confirm)),
    ['p', ['Submitted value: ', state.submission]]
  ]]

const reducerConfirm = nest.reducers({ confirm: confirm.reducer })

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setField':
      return {...state, field: payload,
        confirm: payload ? 'waiting' : 'disabled'}
    case 'confirm.confirmSubmit':
      return {...state, field: '', submission: state.field,
        confirm: 'disabled'}
    default:
      return reducerConfirm(state, { type, payload })
  }
}

const model = {
  field: '',
  submission: '',
  confirm: confirm.model
}

export { view, reducer, model }
