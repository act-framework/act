import TraversableHistory from 'main/internals/TraversableHistory'

export default class ReloadableHistory extends TraversableHistory {
  reload (timeline) {
    this.timeline = timeline
    this.state = this.reduce(this.state, this.timeline)
    this.present += timeline.length
    return this.rerender()
  }
}
