import TraversableHistory from '@act/main/internals/TraversableHistory'

export default class TraversableAnimationHistory extends TraversableHistory {
  push (action) {
    this.delta.push(action)
    return this.concat()
  }
}
