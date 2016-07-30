import TraversableHistory from '@act/main/internals/TraversableHistory'
import splitAt from 'ramda/src/splitAt'

export default class TraversableAnimationHistory extends TraversableHistory {
  push (action) {
    this.state = this.reduce(this.state, [action])
    const [past, future] = splitAt(this.present, this.timeline)
    this.timeline = [...past, action, ...future]
    this.present += 1

    return this.rerender()
  }
}
