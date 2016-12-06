import andValue from './andValue'
import pipe from 'ramda/src/pipe'

export default (processor) => (otherValue) => pipe(
  processor,
  andValue(otherValue)
)
