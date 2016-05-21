import reduce from 'ramda/src/reduce'
import delay from './delay'

export default class History {
  constructor (state, reducer, rerender) {
    this.past = []
    this.future = []
    this.reduce = reduce(reducer)
    this.initialState = state
    this.state = state
    this.delta = []
    this.rerender = () => rerender(this.state)
  }

  concat (actions) {
    this.state = this.reduce(this.state, actions)
    const dom = this.rerender()
    this.past = [...this.past, ...actions]
    this.delta = []
    return dom
  }

  push (action) {
    this.delta.push(action)
    return delay(() => this.concat(this.delta))
  }

  undo () {
    this.future.unshift(this.past.pop())
    this.state = this.reduce(this.initialState, this.past)
    return this.rerender()
  }

  redo () {
    this.past.push(this.future.shift())
    this.state = this.reduce(this.initialState, this.past)
    return this.rerender()
  }

  go (index) {
    if (index === this.past.length) {
      return
    } else if (index > this.past.length) {
      this.past = [...this.past, ...this.future.splice(0, index - this.past.length)]
    } else {
      this.future = [...this.past.splice(index, this.past.length - index), ...this.future]
    }

    this.state = this.reduce(this.initialState, this.past)
    return this.rerender()
  }
}
