import History from './History'

export default class AnimationHistory extends History {
  push (action) {
    this.delta.push(action)
    return this.concat()
  }
}
