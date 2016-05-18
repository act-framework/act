import main from '../../src'
import map from 'ramda/src/map'
import { get, getJSON } from '../../src/signals/sources/xhr'

const goodJSON = (ev, update) => {
  update('loading')
  getJSON('/good.json')(
    ({ items }) => update('success', items)
  )
}

const badJSON = (ev, update) => {
  update('loading')
  getJSON('/bad.json')(
    () => {},
    (_, { message }) => update('failure', message)
  )
}

const badURL = (ev, update) => {
  update('loading')
  get('/waat.json')(
    () => {},
    (_, { message }) => update('failure', message)
  )
}

const view = (model) => (
  ['div', [
    ['button', {click: goodJSON}, 'Fetch good JSON'],
    ['button', {click: badJSON}, 'Fetch bad JSON'],
    ['button', {click: badURL}, 'Fetch bad URL'],
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
main(view, model, reducer)
