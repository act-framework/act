import { testCallsNextWith } from '../helpers'
import dimensions from '../../processes/dimensions'

testCallsNextWith(
  'processes: dimensions',
  dimensions,
  { target: { innerHeight: 7, innerWidth: 6 } },
  [6, 7]
)
