import distinct from '../signals/processes/distinct'
import pipe from '../signals/pipe'
import scroll from './scroll'
import throttle from '../signals/processes/throttle'

export default pipe(
  scroll,
  throttle(300),
  distinct
)
