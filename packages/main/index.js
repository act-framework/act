import History from './internals/History'
import map from 'ramda/src/map'
import isArrayLike from 'ramda/src/isArrayLike'
import toPairs from 'ramda/src/toPairs'

const defaultReducer = (_, { payload }) => payload
const defaultStorage = { get: () => undefined, set: () => {} }

/**
 * Creates an Act application.
 *
 * @name main
 * @kind function
 * @memberof @act/main
 * @param {object} params
 */

const main = function ({
    outputs,
    historyClass = History,
    model,
    node = document.body,
    reducer = defaultReducer,
    storage = defaultStorage,
    inputs = {}
  } = {}) {
  let initialState = storage.get() || (
    typeof model !== 'undefined'
      ? model
      : reducer(undefined, {type: '__probe'})
  )

  const update = (state) => {
    return map((output) => output(history), outputs)
  }

  const history = new historyClass(initialState, reducer, update)

  map(([typeOrAction, input]) => {
    const action = typeof typeOrAction === 'string'
      ? (payload, history) => history.push({ type: typeOrAction, payload })
      : typeOrAction

    input((payload) => action(payload, history))
  }, isArrayLike(inputs) ? inputs : toPairs(inputs))

  return map((output) => output(history), outputs)
}

export default main
