import { testCallsNextWith } from '../helpers'
import position from '../../processes/position'

testCallsNextWith(
  'processes: position',
  position,
  { pageX: 1, pageY: 2 },
  [1, 2]
)
