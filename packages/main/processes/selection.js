/*
 * `selection`
 *
 * Maps a DOM event to a text selection. Used on inputs.
 *
 */

import map from 'zen-signals/map'

export default map(() => window.getSelection().toString())
