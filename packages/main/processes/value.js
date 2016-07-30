/*
 * `value`
 *
 * Maps a DOM event to a value. Use on inputs.
 *
 */

import map from '../signals/processes/map'

export default map((ev) => ev.target.value)
