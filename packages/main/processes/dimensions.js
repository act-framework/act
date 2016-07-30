/*
 * `dimensions`
 *
 * Maps a DOM event to dimensions tuple (represented in JS as an array with two
 * items).
 *
 */

import pipe from '../signals/pipe'
import map from '../signals/processes/map'
import target from './target'
import props from 'ramda/src/props'

export default pipe(
  target,
  map(props(['innerWidth', 'innerHeight']))
)

