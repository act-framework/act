import { tick } from '../../subscriptions/animation'
import { onKeyCode } from '../../subscriptions/keyboard'

const keys = {
  space: 32,
  enter: 13
}

const togglePause = (payload, history) => {
  history.togglePause()
  history.push({type: 'start'})
}

const subscriptions = [
  ['tick', tick],
  ['fly', onKeyCode(keys.space)],
  [togglePause, onKeyCode(keys.enter)]
]

export default subscriptions
