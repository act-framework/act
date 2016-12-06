/*
 * `position`
 *
 * Maps a DOM event to position tuple (represented in JS as an array with two
 * items).
 *
 */

import map from 'zen-signals/map'
import props from 'ramda/src/props'

export default map(props(['pageX', 'pageY']))
