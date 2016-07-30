/*
 * `random`
 *
 * Maps anything to a random number.
 *
 */

import map from '../signals/processes/map'

export default map(() => Math.random())
