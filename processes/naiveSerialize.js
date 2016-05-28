import map from '../signals/processes/map'
import pipe from '../signals/pipe'
import _map from 'ramda/src/map'
import values from 'ramda/src/values'
import props from 'ramda/src/props'

export default pipe(
  map((ev) => values(ev.target)),
  map((fields) => _map(props(['name', 'value']), fields))
)
