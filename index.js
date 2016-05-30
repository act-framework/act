import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import jsonToVirtualDOM from './internals/jsonToVirtualDOM'
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
 * @param {string|json|function} view
 * @param {object} params
 */

const main = function (view, {
    historyClass = History,
    model,
    node = document.body,
    reducer = defaultReducer,
    sideEffects = [],
    storage = defaultStorage,
    subscriptions = {}
  } = {}) {
  let previousTree
  let rootNode

  const render = (view, state) => {
    const json = typeof view === 'function'
      ? view(state, history)
      : view // user may want to perform side-effects only

    const tree = jsonToVirtualDOM(json, history)

    previousTree
      ? rootNode = patch(rootNode, diff(previousTree, tree))
      : node.insertBefore(rootNode = createElement(tree), node.firstChild)

    return (previousTree = tree)
  }

  let initialState = storage.get() || (
    typeof model !== 'undefined'
      ? model
      : reducer(undefined, {type: '__probe'})
  )

  const rerender = (state) => {
    const dom = render(view, state)
    storage.set(state)
    return dom
  }

  const history = new historyClass(initialState, reducer, rerender)

  const dom = render(view, initialState)

  map(([typeOrAction, subscription]) => {
    const action = typeof typeOrAction === 'string'
      ? (payload, history) => history.push({ type: typeOrAction, payload })
      : typeOrAction

    subscription((payload) => action(payload, history))
  }, isArrayLike(subscriptions) ? subscriptions : toPairs(subscriptions))

  return { dom, history, node }
}

export default main
