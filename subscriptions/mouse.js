import _position from '../processes/position'
import fromEvent from '../signals/sources/fromEvent'

// mouse move
const mouseMove = fromEvent(window, 'mousemove').start()

export const position = _position(mouseMove)
