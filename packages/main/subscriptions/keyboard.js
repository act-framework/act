import fromEvent from '../signals/sources/fromEvent'
import _keyCode from '../processes/keyCode'
import _onKeyCode from '../processes/onKeyCode'

const keyUp = fromEvent(window, 'keyup').start()

export const keyCode = _keyCode(keyUp)
export const onKeyCode = (key) => _onKeyCode(key)(keyUp)
