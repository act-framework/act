import tick from '../../animation/subscriptions/tick'
import { onKeyCode } from '../../subscriptions/keyboard'
import fromEvent from '../../signals/sources/fromEvent'

const keys = {
  space: 32,
  enter: 13
}

const start = (payload, history) => {
  history.unpause()
  history.push({type: 'start'})
}

const touch = fromEvent(window, 'touchend')
const subscriptions = [
  ['tick', tick],
  ['fly', onKeyCode(keys.space)],
  ['fly', touch.start()],
  [start, onKeyCode(keys.enter)],
  [start, touch.start()]
]

export default subscriptions
