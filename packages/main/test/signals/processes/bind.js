import test from 'tape'
import bind from '../../../signals/processes/bind'
import { spy } from 'sinon'

test('bind', (assert) => {
  const bound = spy()
  const binding = () => bound

  const signal = spy()
  const next = 1
  bind(binding)(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler('some value')
  assert.deepEqual(bound.lastCall.args[0], 1)

  assert.end()
})
