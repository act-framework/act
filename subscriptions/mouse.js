import * as processes from '../processes'
import fromEvent from '../signals/sources/fromEvent'

// mouse move
const mouseMove = fromEvent(window, 'mousemove').start()

export const positions = processes.positions(mouseMove)
export const x = processes.x(mouseMove)
export const y = processes.y(mouseMove)
