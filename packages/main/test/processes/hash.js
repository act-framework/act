import { testCallsNextWith } from '../helpers'
import hash from '../../processes/hash'

testCallsNextWith(
  'processes: hash',
  hash,
  { target: { location: { hash: '#abc' } } },
  'abc'
)

