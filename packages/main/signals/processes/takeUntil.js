/*
 * `takeUntil` gets the current value in a process and pass it
 * until another process emits a value
 *
 * It's usage is similar to `merge`:
 *
 * ```
 * const source = takeUntil(sourceA, sourceB)
 * const subscriber = process(source)
 * ```
 *
 * ```
 * takeUntil(sourceA, sourceB)
 * ```
 * sourceA --------x-x--x---
 * sourceB o---o------o----o
 * emits   o---o------------
 *
 */

import curry from 'ramda/src/curry'

export default curry((eventSourceStop, eventSource, next) => {
  let stop = false
  eventSourceStop(() => stop = true)
  eventSource((value) => { if(!stop) next(value) })
})
