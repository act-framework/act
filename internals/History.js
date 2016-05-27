import reduce from 'ramda/src/reduce'
import splitAt from 'ramda/src/splitAt'
import delay from './delay'

export default class History {
  constructor (state, reducer, rerender) {
    this.reduce = reduce(reducer)
    this.state = state
    this.delta = []
    this.rerender = () => rerender(this.state)
  }

  subscribe () {
    return (subscription) => {
      this.subscription = subscription
    }
  }

  concat () {
    this.state = this.reduce(this.state, this.delta)
    const dom = this.rerender()
    this.subscription &&
      this.subscription(this.timeline)

    this.delta = []
    return dom
  }

  push (action) {
    this.delta.push(action)
    return delay(() => this.concat())
  }
}
