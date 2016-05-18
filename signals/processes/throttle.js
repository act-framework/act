/* globals performance */

/*
 * `throttle` buffers emitting the value for a given amount of time, in
 * milliseconds.
 *
 * throttle 3000 (assuming each change happens in 1s)
 * changes 123456789012345678---
 * emits   1---5---9---3---7---8
 *
 */

import curry from 'ramda/src/curry'

export default curry((ms, eventSource, next) => {
  console.log('thr', ms, '|', eventSource, next)
  let last, timer

  eventSource((value) => {
    let now = performance.now()

    if (timer) {
      clearTimeout(timer)
    }

    if (!last || (now - last) > ms) {
      last = now
      next(value)
    } else {
      timer = setTimeout(() => {
        next(value)
      }, ms - (now - last))
    }
  })
})
