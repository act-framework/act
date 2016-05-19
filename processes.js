/*
 * This file contains signal processes for many common use cases for web apps.
 */

import map from './signals/processes/map'
import filter from './signals/processes/filter'
import distinct from './signals/processes/distinct'
import filterMap from './signals/processes/filterMap'
import throttle from './signals/processes/throttle'
import always from './signals/processes/always'
import fold from './signals/processes/fold'
import pipe from './signals/pipe'
import equals from 'ramda/src/equals'
import find from 'ramda/src/find'
import toPairs from 'ramda/src/toPairs'
import head from 'ramda/src/head'
import add from 'ramda/src/add'

const ENTER_KEY = 13
const ESC_KEY = 27

/*
 * `value`
 *
 * Maps a DOM event to a value. Use on inputs.
 *
 */

export const value =
  map((ev) => ev.target.value)

/*
 * `value`
 *
 * Maps a DOM event to a keyCode. Use on input's keyup and keydown events.
 *
 */

export const key =
  map((ev) => ev.keyCode)

export const log =
  map((value) => {
    console.log('[ACT] Processor log:', value)
    return value
  })

export const valueAndCode =
  map((ev) => [ev.target.value, ev.keyCode])

// TODO find a way to only
// accept this on keyup
export const valueOnEnter = pipe(
  filterMap((ev) => ev.keyCode === ENTER_KEY && ev.target.value.trim())
)

export const onKey = (keyCode) => pipe(
  key,
  filter(equals(keyCode))
)

export const onEsc = onKey(ESC_KEY)

export const andValue = (otherValue) =>
  map((value) => ({value, ...otherValue}))

const and = (processor) => (otherValue) => pipe(
  processor,
  andValue(otherValue)
)

export const countWith = (amount = 1) => pipe(
  always(amount),
  fold(add, 0)
)

export const count = pipe(
  always(1),
  fold(add, 0)
)

export const valueOnEnterAnd = and(valueOnEnter)
export const valueAnd = and(value)

/*
 * window
 */

export const dimensions =
  map((ev) => [ev.target.innerWidth, ev.target.innerHeight])

export const width =
  map((ev) => ev.target.innerWidth)

// from http://foundation.zurb.com/sites/docs/media-queries.html
const defaultBreakpoints = {
  xxlarge: 1440,
  xlarge: 1200,
  large: 1024,
  medium: 640,
  small: 0
}

export const breakpoint = (config = defaultBreakpoints) =>
  pipe(
    width,
    map((width) =>
      head(find(([breakpoint, max]) => width > max, toPairs(config)))),
    distinct
  )

export const height =
  map((ev) => ev.target.innerHeight)

export const scrollImmediate =
  map((ev) => window.pageYOffset || document.body.scrollTop)

export const scroll = pipe(
  scrollImmediate,
  throttle(300),
  distinct
)

/*
 * sockets
 */

export const emit = (socket, event) =>
  map((value) => socket.emit(event, value))
