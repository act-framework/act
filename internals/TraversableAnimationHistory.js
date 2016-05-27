import TraversableHistory from './TraversableHistory'

export default class TraversableAnimationHistory extends TraversableHistory {

  push (action) {
    this.delta.push(action)
    return this.concat()
  }
}
