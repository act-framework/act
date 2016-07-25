import take from 'ramda/src/take'
import splitAt from 'ramda/src/splitAt'
// import map from 'ramda/src/map'
import _reduce from 'ramda/src/reduce'
import delay from './delay'

const traversableHistory = (state, reducer, _rerender) => {
  const reduce = _reduce(reducer)
  // const subscriptions = []
  let delta = []
  const rerender = () => _rerender(state)
  let timeline = []
  let present = 0
  const initialState = state

  const reload = (newTimeline) => {
    timeline = newTimeline
    state = reduce(state, timeline)
    present += timeline.length
    return rerender()
  }

  const concat = () => {
    state = reduce(state, delta)
    const [past, future] = splitAt(present, timeline)
    timeline = [...past, ...delta, ...future]
    present += delta.length
    delta = []

    // map((subscription) => subscription(this), this.subscriptions)
    return rerender()
  }

  const undo = () => go(present - 1)
  const redo = () => go(present + 1)
  const go = (index) => {
    index = parseInt(index)
    if (index === present ||
        index < 0 ||
        index > timeline.length) {
      return
    }

    state = reduce(initialState, take(present = index, timeline))
    return rerender()
  }

  const push = (action) => {
    delta.push(action)
    return delay(() => concat())
  }

  return {
    go,
    undo,
    redo,
    reload,
    push,
    get length () { return timeline.length },
    get current () { return timeline[present - 1] },
    get previous () { return timeline[present - 2] },
    get next () { return timeline[present] }
  }
}

export default traversableHistory
/*
export default class TraversableHistory extends History {
  constructor (...args) {
    super(...args)

    this.timeline = []
    this.present = 0
    this.initialState = this.state
  }

  reload (timeline) {
    this.timeline = timeline
    this.state = this.reduce(this.state, this.timeline)
    this.present += timeline.length
    return this.rerender()
  }

  concat () {
    this.state = this.reduce(this.state, this.delta)
    const [past, future] = splitAt(this.present, this.timeline)
    this.timeline = [...past, ...this.delta, ...future]
    this.present += this.delta.length
    this.delta = []

    map((subscription) => subscription(this), this.subscriptions)
    return this.rerender()
  }

  undo () {
    return this.go(this.present - 1)
  }

  redo () {
    return this.go(this.present + 1)
  }

  get length () {
    return this.timeline.length
  }

  get current () {
    return this.timeline[this.present - 1]
  }

  get previous () {
    return this.timeline[this.present - 2]
  }

  get next () {
    return this.timeline[this.present]
  }

  go (index) {
    index = parseInt(index)
    if (index === this.present ||
        index < 0 ||
        index > this.timeline.length) {
      return
    }

    this.state = this.reduce(this.initialState, take(this.present = index, this.timeline))
    return this.rerender()
  }
  }
  */
