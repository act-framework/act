import map from '../signals/processes/map'
import tail from 'ramda/src/tail'

export default
  map((ev) => tail(ev.target.location.hash))
