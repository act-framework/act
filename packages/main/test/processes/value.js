import { testCallsNextWith } from '../helpers'
import value from '../../processes/value'

testCallsNextWith(
  'processes: value',
  value,
  { target: { value: 5 } },
  5
)

