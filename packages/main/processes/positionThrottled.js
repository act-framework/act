import distinct from 'zen-signals/distinct'
import pipe from '../signals/pipe'
import position from './position'
import throttle from 'zen-signals/throttle'

export default pipe(
  throttle(300),
  position,
  distinct
)
