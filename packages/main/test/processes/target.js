import { testCallsNextWith } from '../helpers'
import target from '../../processes/target'

testCallsNextWith(
  'processes: target',
  target,
  { target: 10 },
  10
)
