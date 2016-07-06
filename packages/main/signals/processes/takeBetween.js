/*
 * `takeBetween` gets the current value in a process and pass it
 * if and only if it was emitted between two consecutive values
 * of another process, which acts like a a switch
 *
 * It's usage is similar to `merge`:
 *
 * ```
 * const source = takeBetween(sourceA, sourceB)
 * const subscriber = process(source)
 * ```
 *
 * ```
 * takeBetween(sourceA, sourceB)
 * ```
 * sourceA --x--x----x----x-
 * sourceB o--o---o---o-o--o
 * emits   ---o-------o-o---
 *
 */

import curry from 'ramda/src/curry'

export default curry((eventSourceSwitch, eventSourceValues, next) => {
  let on = false
  eventSourceSwitch(() => on = !on)
  eventSourceValues((value) => { if(on) next(value) })
})
