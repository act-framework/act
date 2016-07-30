/*
 * `selection`
 *
 * Maps a DOM event to a text selection. Used on inputs.
 *
 */

import map from '../signals/processes/map'

export default map(() => window.getSelection().toString())
