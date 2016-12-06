import pipe from 'ramda/src/pipe'
import map from 'zen-signals/map'
import target from './target'
import prop from 'ramda/src/prop'

export default pipe(
  target,
  map(prop('innerWidth'))
)
