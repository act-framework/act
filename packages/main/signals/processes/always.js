/*
 * `always` emits a single value for every value it receives. It's also known as
 * `const` in the functional world.
 *
 * ```
 * always(1)
 * ```
 * changes 1234567890
 * emits   1111111111
 *
 */

import build from './build'

export default build((constant, next) => {
  next(constant)
})
