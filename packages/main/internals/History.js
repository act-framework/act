import reduce from 'ramda/src/reduce'
import delay from './delay'
import drop from 'ramda/src/drop'

const dropOne = drop(1)

export default class History {
  constructor (state, reducer, callback) {
    this.reduce = reduce(reducer)
    this.state = state
    this.delta = []
    this.previous = null
    this.callback = () => callback(this)
  }

  concat () {
    this.previous = this.delta.length == 1
      ? this.state
      : this.state = this.reduce(this.state, dropOne(this.delta))
    this.state = this.reduce(this.state, this.delta)

    this.delta = []
    this.callback()

  }

  push (action) {
    this.delta.push(action)
    return delay(() => this.concat())
  }
}
