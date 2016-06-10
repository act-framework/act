/*
 * `liftN` allows you to operate over streams at any point in time,
 * assuming you used `stepper` to get a function that does that.
 *
 * The first argument is a function that will receive the values and return
 * something and the next N arguments are stepped processes.
 *
 * Assuming you have stepped three processes into `p1`, `p2` and `p3`:
 *
 * ```
 * liftN((v1, v2, v3) => v1 + v2 + v3, p1, p2, p3)
 * ```
 *
 */

import snapshot from './snapshot'
import map from 'ramda/src/map'

export default (combine, ...behaviors) => () => {
  return combine(...map(snapshot, behaviors))
}
