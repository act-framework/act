import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import reduce from 'ramda/src/reduce'
import identity from 'ramda/src/identity'
import jsonToVirtualDOM from './internals/jsonToVirtualDOM'
import isFunction from './internals/isFunction'

let tree, rootNode
export const render = (json, update, globalErrorHandler, domNode = document.body) => {
  tree = jsonToVirtualDOM(json, update)
  rootNode = createElement(tree)
  domNode.insertBefore(rootNode, domNode.firstChild)
}

let animationFrameId

const main = function (view, state, reducer, { subscriptions = {}, presenter = identity, globalErrorHandler, storage } = {}) {
  const initialState = state // storage && storage.get() || state
  let currentState = initialState
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

    // TODO: The performance of libe below is shitty
    // Don't remove, but think of a solution
    // storage && storage.set(currentState)
    // view(presenter(currentState))

    batchedUpdates.push(latest)

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId)
    }

    animationFrameId = window.requestAnimationFrame(() => {
      currentState = reduce(reducer, currentState, batchedUpdates)
      batchedUpdates = []

      const json = view(currentState)
      const newTree = jsonToVirtualDOM(json, update)
      rootNode = patch(rootNode, diff(tree, newTree))
      tree = newTree
      animationFrameId = null
    })
  }

  render(isFunction(view) ? view(initialState) : view, update, globalErrorHandler)

  mapObjIndexed((subscription, type) => {
    console.log('1', subscription, type)
    subscription((value) => {
      console.log('2', value)
      update(type, value)
    })
  }, subscriptions)
}

export default main
