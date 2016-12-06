import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import jsonToVirtualDOM from './jsonToVirtualDOM'

let previousTree
let rootNode

const render = (view, history, node) => {
  const json = typeof view === 'function'
    ? view(history.state)
    : view // user may want to perform side-effects only

  const tree = jsonToVirtualDOM(json, history)

  previousTree
    ? rootNode = patch(rootNode, diff(previousTree, tree))
    : node.insertBefore(rootNode = createElement(tree), node.firstChild)

  return (previousTree = tree)
}

const dom = (view, node = document.body) => (history) => {
  // const rerender = (state) => {
    // const dom = render(view, state)
    // storage.set(state)
    // return dom
  // }

  return render(view, history, node)
}

export default dom
