import { testCallsNextWith } from '../helpers'
import valueAndKeyCode from '../../processes/valueAndKeyCode'

testCallsNextWith(
  'processes: valueAndKeyCode',
  valueAndKeyCode,
  { target: { value: 5 }, keyCode: 6 },
  [5, 6]
)
