import test from 'tape'
import filter from '../../../signals/processes/filter'
import { spy } from 'sinon'
import equals from 'ramda/src/equals'

test('filter', (assert) => {
  const signal = spy()
  const next = spy()
  filter(equals(22))(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(22)
  handler(6)
  assert.equal(next.getCall(0).args[0], 22)
  assert.ok(!next.getCall(1))

  assert.end()
})
