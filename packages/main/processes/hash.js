/* globals location */

import map from '../signals/processes/map'
import tail from 'ramda/src/tail'

export default
  map(() => tail(location.hash))
