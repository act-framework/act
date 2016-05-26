import History from './History'
import splitAt from 'ramda/src/splitAt'
import take from 'ramda/src/take'
import delay from './delay'

export default class AnimationHistory extends History {

  concat () {
    this.state = this.reduce(this.state, this.delta)
    const dom = this.rerender()
    const [past, future] = splitAt(this.present, this.timeline)
    this.timeline = [...past, ...this.delta, ...future]
    this.subscription &&
      this.subscription(this.timeline)

    this.present += this.delta.length
    this.delta = []
    return dom
  }

  push (action) {
    this.delta.push(action)
    return this.concat()
  }
}
