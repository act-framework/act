import test from 'tape'
import filterMap from '../../../signals/processes/filterMap'
import { spy } from 'sinon'
import equals from 'ramda/src/equals'

test('filterMap', (assert) => {
  const signal = spy()
  const next = spy()
  filterMap(equals(1))(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  handler(2)
  assert.equal(next.getCall(0).args[0], true)
  assert.ok(!next.getCall(1))

  assert.end()
})
