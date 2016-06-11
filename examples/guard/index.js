import main from 'main'
import guard from 'main/helpers/reducer/guard'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'
import equals from 'ramda/src/equals'
import complement from 'ramda/src/complement'

const view = (model) => (
  ['main', [
    ['button', { click: 'load' }, 'Load'],
    ['button', { click: 'other' }, 'Other action'],
    ['button', { click: 'another' }, 'Another action'],
    model.loading && ['h1', 'Loading...']
  ]]
)

const load = equals('load')
const unload = complement(load)
const loading = set(lensProp('loading'))

const reducer = guard([
  [load, loading(true)],
  [unload, loading(false)] // runs for all actions except `'load'`
])

const model = { loading: false }
main(view, { model, reducer })
