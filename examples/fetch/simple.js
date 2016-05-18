import main from '../../src'
import map from 'ramda/src/map'
import * as api from './api'
import asyncFetch from '../../src/actions/asyncFetch'

const view = (model) => (
  ['div', [
    ['button', {click: asyncFetch('items', api.good)}, 'Fetch good JSON'],
    ['button', {click: asyncFetch('items', api.bad)}, 'Fetch bad JSON'],
    ['button', {click: asyncFetch('items', api.waaat)}, 'Fetch bad URL'],
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
      return {...state, loading: false, error: payload}
    case 'clear':
      return {...state, items: [], error: null}
    default:
      return state
  }
}

const model = {loading: false, items: [], error: null}
main(view, model, reducer)
