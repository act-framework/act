/*
 * `distinct` remembers the previous emited value and only emits a new one if
 * it changes.
 *
 * ```
 * distinct
 * ```
 * changes 1122234556
 * emits   1-2--345-6
 *
 */

import curry from 'ramda/src/curry'

export default curry((eventSource, next) => {
  let lastValue

  eventSource((value) => {
    if (lastValue !== value) {
      next(lastValue = value)
    }
  })
})
