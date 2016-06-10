import pipe from '../signals/pipe'
import map from '../signals/processes/map'
import target from './target'
import prop from 'ramda/src/prop'

export default pipe(
  target,
  map(prop('innerHeight'))
)
