/*
 * `keyCode`
 *
 * Maps a DOM event to a keyCode. Use on input's keyup and keydown events.
 *
 */

import map from '../signals/processes/map'

export default map((ev) => ev.keyCode)
