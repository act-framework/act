import map from '../signals/processes/map'
import pipe from '../signals/pipe'
import mapObjectIndex from 'ramda/src/map'
import identity from 'ramda/src/identity'
import _map from 'ramda/src/map'
import props from 'ramda/src/props'
import prop from 'ramda/src/prop'
import fromPairs from 'ramda/src/fromPairs'
import preventDefault from './preventDefault'
import not from 'ramda/src/not'
import isEmpty from 'ramda/src/isEmpty'
import _filter from 'ramda/src/filter'
import target from './target'

const hasName = pipe(prop('name'), isEmpty, not)

export default pipe(
  preventDefault,
  target,
  map(mapObjectIndex(identity)),
  map(_filter(hasName)),
  map(_map(props(['name', 'value']))),
  map(fromPairs)
)
