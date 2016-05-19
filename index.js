import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import reduce from 'ramda/src/reduce'
import identity from 'ramda/src/identity'
import jsonToVirtualDOM from './internals/jsonToVirtualDOM'

let tree, rootNode
export const render = (json, { update, globalErrorHandler, node = document.body } = {}) => {
  tree = jsonToVirtualDOM(json, update)
  rootNode = createElement(tree)
  node.insertBefore(rootNode, node.firstChild)
  return tree
}

const defaultReducer = (_, { payload }) => payload

let animationFrameId

const main = function (view, { model, reducer = defaultReducer, node, subscriptions = {}, presenter = identity, globalErrorHandler, storage } = {}) {
  // TODO warn that if it's not a function, but the user
  // passed model or subscriptions, it will not work as expected
  if (typeof view !== 'function') {
    return { dom: render(view, { node }) }
  }

  let currentState = storage && storage.get() || model
  // TODO: Think of a simple way of getting history from
  // window and run it
  // const history = []

  let batchedUpdates = []

  const update = (type, payload) => {
    const latest = { type, payload }
    // TODO: Don't remove, when replaying we need to run
    // the whole thing from history again
    // history.push(latest)
    // reduce(reducer, initialState, history)

    // TODO: think of a good way to debug the currentState
    // window.currentState = currentState

    batchedUpdates.push(latest)

    const rerender = () => {
      currentState = reduce(reducer, currentState, batchedUpdates)

      // TODO: The performance of line below is shitty
      // Don't remove, but think of a solution
      storage && storage.set(currentState)
      // TODO: rethink the idea of presenters
      // view(presenter(currentState))

      batchedUpdates = []

      const json = view(currentState)
      const newTree = jsonToVirtualDOM(json, update)
      rootNode = patch(rootNode, diff(tree, newTree))
      tree = newTree
      return tree
      // animationFrameId = null
    }

    // TODO: create animation frame signal source and use it
    if (typeof window !== 'undefined') {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = window.requestAnimationFrame(rerender)
    } else {
      return rerender()
    }
  }

  const dom = render(view(currentState), { update, globalErrorHandler, node })

  mapObjIndexed((subscription, type) => {
    subscription((value) => {
      return update(type, value)
    })
  }, subscriptions)

  return { dom, update }
}

export default main
