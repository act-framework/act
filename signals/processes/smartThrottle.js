/* globals performance */

/*
 * smartThrottle differs from throttle in that it
 * emits the value if the value doesn't change for less
 * time than the original throttle.
 *
 * throttle 3
 * changes oooooooooooooooooo---
 * emits   x---x---x---x---x---x
 *
 * Notice the final value takes 2s to be emitted. But
 * `smartThrottle` will figure out the value stopped
 * changing for a bit, and emit it. It makes some things
 * smoother, like when you present something based on
 * scroll positions.
 *
 * smartThrottle 3
 * changes oooooooooooooooooo---
 * emits   x---x---x---x---x-x--
 */

import curry from 'ramda/src/curry'

export default curry((ms, eventSource, next) => {
  let last, timer, lastValue

  eventSource((value) => {
    console.log(value)
    let now = performance.now()

    if (timer) {
      clearTimeout(timer)
    }

    if (!last || (now - last) > ms || lastValue === value) {
      last = now
      next(value)
    } else {
      timer = setTimeout(() => {
        next(value)
      }, ms - (now - last))
    }
  })
})
