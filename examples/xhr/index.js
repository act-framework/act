import main from '../..'
import map from 'ramda/src/map'
import { get, getJSON } from '../../signals/sources/xhr'

const goodJSON = (_, history) => {
  history.push({ type: 'loading' })

  getJSON('/good.json')(
    ({ items }) => history.push({ type: 'success', payload: items })
  )
}

const badJSON = (_, history) => {
  history.push({ type: 'loading' })

  getJSON('/bad.json')(
    () => {},
    (_, { message }) => history.push({ type: 'failure', payload: message })
  )
}

const badURL = (_, history) => {
  history.push({ type: 'loading' })

  get('/waat.json')(
    () => {},
    (_, { message }) => history.push({ type: 'failure', payload: message })
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

main(view, { model, reducer })
