import _reduce from 'ramda/src/reduce'
import delay from './delay'
// import map from 'ramda/src/map'

const history = (state, reducer, _rerender) => {
  const reduce = _reduce(reducer)
  // this.state = state
  const subscriptions = []
  let delta = []
  const rerender = () => _rerender(state)

  const subscribe = (subscription) =>
    subscriptions.push(subscription)

  const concat = () => {
    state = reduce(state, delta)
    const dom = rerender()
    delta = []

    // map((subscription) => subscription(this), this.subscriptions)
    return dom
  }

  const push = (action) => {
    delta.push(action)
    return delay(() => concat())
  }

  return { subscribe, push }
}

export default history
