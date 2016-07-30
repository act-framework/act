import History from '@act/main/internals/History'

export default class AnimationHistory extends History {
  push (action) {
    this.state = this.reduce(this.state, [action])
    return this.rerender()
  }
}
