import _position from '../processes/position'
import _positionThrottled from '../processes/positionThrottled'
import fromEvent from '../signals/sources/fromEvent'

// mouse move
const mouseMove = fromEvent(window, 'mousemove').start()

export const position = _position(mouseMove)
export const positionThrottled = _positionThrottled(mouseMove)
