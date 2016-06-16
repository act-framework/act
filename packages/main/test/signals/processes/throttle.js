import test from 'tape'
import throttle from '../../../signals/processes/throttle'
import { spy } from 'sinon'

test('throttle', (assert) => {
  const signal = spy()
  const next = spy()
  throttle(2, signal, next)

  const handler = signal.getCall(0).args[0]

  handler(5)
  handler(6)
  handler(7)
  assert.equal(next.callCount, 1)
  assert.equal(next.lastCall.args[0], 5)

  setTimeout(() => {
    assert.equal(next.callCount, 2)
    assert.equal(next.lastCall.args[0], 7)
    assert.end()
  }, 2)
})
