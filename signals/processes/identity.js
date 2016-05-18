/*
 * `identity` simply passes along the value received. Analog to `id` in Haskell
 * and other languages.
 *
 * ```
 * identity
 * ```
 * changes 1234567890
 * emits   1234567890
 *
 */

import curry from 'ramda/src/curry'

export default curry((eventSource, next) => {
  eventSource(next)
})
