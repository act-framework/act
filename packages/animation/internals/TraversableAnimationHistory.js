import TraversableHistory from '@act/main/internals/TraversableHistory'
import splitAt from 'ramda/src/splitAt'
import map from 'ramda/src/map'

export default class TraversableAnimationHistory extends TraversableHistory {
  constructor (...args) {
    super(...args)

    delete this.delta
  }

  push (action) {
    this.state = this.reduce(this.state, [action])
    const [past, future] = splitAt(this.present, this.timeline)
    this.timeline = [...past, action, ...future]
    this.present += 1

    map((subscription) => subscription(this), this.subscriptions)
    return this.rerender()
  }
}
