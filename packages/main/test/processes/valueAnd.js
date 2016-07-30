import { testCallsNextWith } from '../helpers'
import valueAnd from '../../processes/valueAnd'

testCallsNextWith(
  'processes: valueAnd',
  valueAnd({ horsemen: 4 }),
  { target: { value: 5 } },
  { value: 5, horsemen: 4 }
)
