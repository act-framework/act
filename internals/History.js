import reduce from 'ramda/src/reduce'
import delay from './delay'
import map from 'ramda/src/map'

export default class History {
  constructor (state, reducer, rerender) {
    this.reduce = reduce(reducer)
    this.state = state
    this.subscriptions = []
    this.delta = []
    this.rerender = () => rerender(this.state)
  }

  subscribe (subscription) {
    this.subscriptions.push(subscription)
  }

  concat () {
    this.state = this.reduce(this.state, this.delta)
    const dom = this.rerender()
    this.delta = []

    map((subscription) => subscription(this), this.subscriptions)
    return dom
  }

  push (action) {
    this.delta.push(action)
    return delay(() => this.concat())
  }
}
