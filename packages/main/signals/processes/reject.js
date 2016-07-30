/*
 * `reject` is the opposite of `filter`, passing the received value only if the
 * condition is _not_ satisfied.
 *
 * ```
 * reject(eq(5))
 * ```
 * changes 1234565432123456
 * emits   1234-6-4321234-6
 *
 */

import build from './build'

export default build((predicate, next, value) => {
  if (!predicate(value)) next(value)
})
