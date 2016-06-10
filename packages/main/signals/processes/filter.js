/*
 * `filter` gets the current value in the process and pass it along if a given
 * condition is satisfied.
 *
 * ```
 * map(eq(5))
 * ```
 * changes 1234565432123456
 * emits   ----5-5-------5-
 *
 */

import build from './build'

export default build((handler, next, value) => {
  if (handler(value)) next(value)
})
