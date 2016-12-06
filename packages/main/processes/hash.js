import map from 'zen-signals/map'
import tail from 'ramda/src/tail'

export default
  map((ev) => tail(ev.target.location.hash))
