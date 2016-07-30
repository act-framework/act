import test from 'tape'
import reject from '../../../signals/processes/reject'
import { spy } from 'sinon'
import equals from 'ramda/src/equals'

test('reject', (assert) => {
  const eventStream = spy()
  const next = spy()
  reject(equals(22))(eventStream)(next)

  const handler = eventStream.getCall(0).args[0]

  handler(22)
  handler(6)
  assert.equal(next.getCall(0).args[0], 6)

  assert.end()
})
