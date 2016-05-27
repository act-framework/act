import take from 'ramda/src/take'
import History from './History'

export default class TraversableHistory extends History {
  constructor (...args) {
    super(...args)

    this.timeline = []
    this.present = 0
    this.initialState = this.state
    delete this.delta
  }

  push (action) {
    this.state = this.reduce(this.state, [action])
    this.timeline = [...this.timeline, action]
    this.subscription &&
      this.subscription(this.timeline)

    this.present += 1
    return this.rerender()
  }

  undo () {
    return this.go(this.present - 1)
  }

  redo () {
    return this.go(this.present + 1)
  }

  get length () {
    return this.timeline.length
  }

  get current () {
    return this.timeline[this.present - 1]
  }

  get previous () {
    return this.timeline[this.present - 2]
  }

  get next () {
    return this.timeline[this.present]
  }

  go (index) {
    index = parseInt(index)
    if (index === this.present ||
        index < 0 ||
        index > this.timeline.length) {
      return
    }

    this.state = this.reduce(this.initialState, take(this.present = index, this.timeline))
    return this.rerender()
  }
}
