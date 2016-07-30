import distinct from '../signals/processes/distinct'
import pipe from '../signals/pipe'
import position from './position'
import throttle from '../signals/processes/throttle'

export default pipe(
  throttle(300),
  position,
  distinct
)
