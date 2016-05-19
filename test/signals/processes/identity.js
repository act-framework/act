import test from 'tape'
import identity from '../../../signals/processes/identity'
import { spy } from 'sinon'

test('identity', (assert) => {
  const signal = spy()
  const next = spy()
  identity()(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  assert.ok(next.calledWith(1))
  handler(2)
  assert.ok(next.calledWith(2))

  assert.end()
})
