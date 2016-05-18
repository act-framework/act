import main from '../../src'
import map from 'ramda/src/map'
import asyncJSON from '../../src/actions/asyncJSON'

const goodJSON = asyncJSON('items', '/good.json')
const badJSON = asyncJSON('items', '/bad.json')
const badURL = asyncJSON('items', '/waaat.json')

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
    case 'items.loading':
      return {...state, loading: true}
    case 'items.success':
      return {...state, loading: false, items: payload.items}
    case 'items.failure':
      return {...state, loading: false, error: payload.error.message}
    case 'clear':
      return {...state, items: [], error: null}
    default:
      return state
  }
}

const model = {loading: false, items: [], error: null}
main(view, model, reducer)
