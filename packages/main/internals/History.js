import reduce from 'ramda/src/reduce'
import delay from './delay'

export default class History {
  constructor (state, reducer, rerender) {
    this.reduce = reduce(reducer)
    this.state = state
    this.delta = []
    this.rerender = () => rerender(this.state)
  }

  concat () {
    this.state = this.reduce(this.state, this.delta)
    const dom = this.rerender()
    this.delta = []

    return dom
  }

  push (action) {
    this.delta.push(action)
    return delay(() => this.concat())
  }
}
