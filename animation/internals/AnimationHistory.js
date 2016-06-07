import History from '@act/main/internals/History'
import map from 'ramda/src/map'

export default class AnimationHistory extends History {
  constructor (...args) {
    super(...args)

    delete this.delta
  }

  push (action) {
    if (this.paused) return
    this.state = this.reduce(this.state, [action])
    const dom = this.rerender()

    map((subscription) => subscription(this), this.subscriptions)
    return dom
  }
}
