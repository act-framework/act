/* globals FormData */

import map from '../signals/processes/map'

export default
  map((ev) => new FormData(ev.target))
