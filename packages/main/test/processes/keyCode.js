import { testCallsNextWith } from '../helpers'
import keyCode from '../../processes/keyCode'

testCallsNextWith(
  'processes: keyCode',
  keyCode,
  { keyCode: 6 },
  6
)
