import { testCallsNextWith } from '../helpers'
import scroll from '../../processes/scroll'

testCallsNextWith(
  'processes: scroll',
  scroll,
  { target: { pageYOffset: 8 } },
  8
)
