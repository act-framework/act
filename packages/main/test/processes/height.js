import { testCallsNextWith } from '../helpers'
import height from '../../processes/height'

testCallsNextWith(
  'processes: height',
  height,
  { target: { innerHeight: 6 } },
  6
)

