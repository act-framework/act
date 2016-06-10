import test from 'tape'
import stop from '../../../signals/processes/stop'
import { spy } from 'sinon'

test('stop', (assert) => {
  const signal = spy()
  const next = spy()
  stop()(signal)(next)

  assert.ok(!signal.getCall(0))

  assert.end()
})
