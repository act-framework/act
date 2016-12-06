/*
 * `value`
 *
 * Maps a DOM event to a value. Use on inputs.
 *
 */

import map from 'zen-signals/map'

export default map((ev) => ev.target.value)
