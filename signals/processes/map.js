/*
 * `map` gets the current value in the process and returns a new one.
 *
 * ```
 * map(add(1))
 * ```
 * changes 12345678
 * emits   23456789
 *
 */

import build from './build'

export default build((handler, next, value) => {
  next(handler(value))
})
