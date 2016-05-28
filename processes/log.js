/*
 * `log`
 *
 * Just a helper for debbuging using `console.log`. Doesn't change the original
 * value, only executes this side effect.
 *
 * @usage
 * ```
 * const customProcess = pipe(
 *   log,
 *   proc1,
 *   log,
 *   proc2,
 *   log
 * )
 * ```
 */

import map from '../signals/processes/map'

export default map((value) => {
  console.log('[ACT] Processor log:', value)
  return value
})
