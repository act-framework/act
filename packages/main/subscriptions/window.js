import _dimensions from '../processes/dimensions'
import _height from '../processes/height'
import _width from '../processes/width'
import _breakpoint from '../processes/breakpoint'
import _scrollThrottled from '../processes/scrollThrottled'
import _position from '../processes/position'
import fromEvent from '../signals/sources/fromEvent'

// resize
const resize = fromEvent(window, 'resize').start({ target: window })

export const dimensions = _dimensions(resize)
export const height = _height(resize)
export const width = _width(resize)

export const breakpoint = _breakpoint(undefined)(resize)

export const breakpointWith = (config) =>
  _breakpoint(config)(resize)

// scroll
const scrollE = fromEvent(window, 'scroll').start()

export const scrollThrottled = _scrollThrottled(scrollE)

// click
const click = fromEvent(window, 'click').start()

export const clickPosition = _position(click)
