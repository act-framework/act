import andValue from './andValue'
import pipe from '../signals/pipe'

export default (processor) => (otherValue) => pipe(
  processor,
  andValue(otherValue)
)
