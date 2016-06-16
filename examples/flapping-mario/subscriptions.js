import tick from 'animation/subscriptions/tick'
import { onKeyCode } from 'main/subscriptions/keyboard'
import fromEvent from 'main/signals/sources/fromEvent'
import merge from 'main/signals/processes/merge'

const space = (payload, history) =>
  history.push({type: history.state.status === 'home' ? 'start' : 'fly'})

const touch = fromEvent(window, 'touchend')
const subscriptions = [
  ['tick', tick],
  [space, merge(onKeyCode(32), touch.start())]
]

export default subscriptions
