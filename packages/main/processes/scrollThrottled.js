import distinct from 'zen-signals/distinct'
import pipe from 'ramda/src/pipe'
import scroll from './scroll'
import throttle from 'zen-signals/throttle'

export default pipe(
  scroll,
  throttle(300),
  distinct
)
