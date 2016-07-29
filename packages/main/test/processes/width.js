import { testCallsNextWith } from '../helpers'
import width from '../../processes/width'

testCallsNextWith(
  'processes: width',
  width,
  { target: { innerWidth: 7 } },
  7
)
