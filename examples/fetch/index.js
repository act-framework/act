import main from '../..'
import map from 'ramda/src/map'
import * as api from './api'

const get = (apiCall) => (_, history) => {
  history.push({ type: 'loading' })

  apiCall()(
    (json) => history.push({ type: 'success', payload: json.items }),
    (r) => history.push({ type: 'failure', payload: r.statusText || r.message })
  )
}

const view = (model) => (
  ['div', [
    ['button', {click: get(api.good)}, 'Fetch good JSON'],
    ['button', {click: get(api.bad)}, 'Fetch bad JSON'],
    ['button', {click: get(api.waaat)}, 'Fetch bad URL'],
    ['button', {click: {clear: true}}, 'Clear'],
    model.loading
      ? ['div', 'Loading...']
      : ['ul', map(item, model.items)],
    model.error && ['div', {style: 'background: red; padding: 10px'}, model.error]
  ]]
)

const item = (item) => (
  ['li', item]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'loading':
      return {...state, loading: true}
    case 'success':
      return {...state, loading: false, items: payload}
    case 'failure':
      return {...state, loading: false, error: payload}
    case 'clear':
      return {...state, items: [], error: null}
    default:
      return state
  }
}

const model = {loading: false, items: [], error: null}

main(view, { model, reducer })
