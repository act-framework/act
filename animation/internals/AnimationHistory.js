import History from '@act/main/internals/History'

export default class AnimationHistory extends History {
  constructor (...args) {
    super(...args)

    delete this.delta
  }

  push (action) {
    this.state = this.reduce(this.state, [action])
    const dom = this.rerender()
    this.subscription &&
      this.subscription(this.timeline)

    this.delta = []
    return dom
  }
}
