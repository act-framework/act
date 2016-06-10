/*
 * `filterMap` differ from `filter` in that it doesn't pass the received value
 * but the value it returns, unless it's falsey.
 *
 * ```
 * filterMap(eq(5))
 * ```
 * changes 1234565432123456
 * emits   ----T-T-------T-
 *
 */

import build from './build'

export default build((predicate, next, value) => {
  const result = predicate(value)
  if (result) next(result)
})
