import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import reduce from 'ramda/src/reduce'
import jsonToVirtualDOM from './internals/jsonToVirtualDOM'
import delay from './internals/delay'

const defaultReducer = (_, { payload }) => payload
const defaultStorage = { get: () => undefined, set: () => {} }

const main = function (view, {
  model,
  reducer = defaultReducer,
  node = document.body,
  subscriptions = {},
  storage = defaultStorage } = {}) {
  let previousTree
  let rootNode

  const render = (json) => {
    const tree = jsonToVirtualDOM(json, update)

    previousTree
      ? rootNode = patch(rootNode, diff(previousTree, tree))
      : node.insertBefore(rootNode = createElement(tree), node.firstChild)

    return (previousTree = tree)
  }

  if (typeof view !== 'function') {
    return { dom: render(view) }
  }

  let batchedUpdates = []
  let currentState = storage.get() ||
    typeof model !== 'undefined' && model ||
    reducer({}, {type: '__probe'})

  const rerender = (state, history) => {
    currentState = reduce(reducer, state, history)
    const dom = render(view(currentState))
    batchedUpdates = []
    storage.set(currentState)
    return dom
  }

  const update = (type, payload) => {
    batchedUpdates.push({ type, payload })

    return delay(() => rerender(currentState, batchedUpdates))
  }

  const dom = render(view(currentState))

  mapObjIndexed((subscription, type) =>
    subscription((value) =>
      update(type, value))
  , subscriptions)

  return { dom, update, rerender }
}

export default main
