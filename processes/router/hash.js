/* globals location */

import map from '../../signals/processes/map'
import tail from 'ramda/src/tail'

export const hash =
  map(() => tail(location.hash))
