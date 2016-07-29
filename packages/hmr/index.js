import _main from 'main'
import historyClass from './ReloadableHistory'

const main = (view, opts) => {
  const mod = opts.module
  delete opts.module

  const { node, history } = _main(view, { historyClass, ...opts })

  if (mod.hot) {
    mod.hot.accept()

    if (mod.hot.data && mod.hot.data.history) {
      history.reload(mod.hot.data.history)
    }

    mod.hot.dispose((data) => {
      node.removeChild(node.firstChild)
      data.history = history.timeline
    })
  }

  return { node, history }
}

export default main
