import * as processes from '../processes'
import fromEvent from '../signals/sources/fromEvent'

// resize
const resize = fromEvent(window, 'resize').start()

export const dimensions = processes.dimensions(resize)
export const height = processes.height(resize)
export const width = processes.width(resize)

export const breakpoint =
  processes.breakpoint(undefined)(resize)

export const breakpointWith = (config) =>
  processes.breakpoint(config)(resize)

// scroll
const scrollE = fromEvent(window, 'scroll').start()

export const scroll = processes.scroll(scrollE)

// mouse move
const mouseMove = fromEvent(window, 'mousemove').start()

export const positions = processes.positions(mouseMove)
export const x = processes.x(mouseMove)
export const y = processes.y(mouseMove)
