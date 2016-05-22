import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import jsonToVirtualDOM from './internals/jsonToVirtualDOM'
import History from './internals/History'

const defaultReducer = (_, { payload }) => payload
const defaultStorage = { get: () => undefined, set: () => {} }

const main = function (view, {
    model,
    node = document.body,
    reducer = defaultReducer,
    storage = defaultStorage,
    subscriptions = {}
  } = {}) {
  let previousTree
  let rootNode

  const render = (json) => {
    const tree = jsonToVirtualDOM(json, history)

    previousTree
      ? rootNode = patch(rootNode, diff(previousTree, tree))
      : node.insertBefore(rootNode = createElement(tree), node.firstChild)

    return (previousTree = tree)
  }

  if (typeof view !== 'function') {
    return { dom: render(view) }
  }

  let initialState = storage.get() ||
    typeof model !== 'undefined' && model ||
    reducer(undefined, {type: '__probe'})

  const rerender = (state) => {
    const dom = render(view(state))
    storage.set(state)
    return dom
  }

  const history = new History(initialState, reducer, rerender)

  const update = (action) => history.push(action)

  const dom = render(view(initialState))

  mapObjIndexed((subscription, type) =>
    subscription((payload) => update({ type, payload }))
  , subscriptions)

  return { dom, history }
}

export default main
