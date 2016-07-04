import test from 'tape'
import takeUntil from '../../../signals/processes/takeUntil'
import { spy } from 'sinon'

test('takeUntil', (assert) => {
  const signal1 = spy()
  const signal2 = spy()
  const next = spy()
  takeUntil(signal1, signal2, next)

  const handler1 = signal1.getCall(0).args[0]
  const handler2 = signal2.getCall(0).args[0]

  handler2(1)
  assert.equal(next.callCount, 1)
  assert.equal(next.lastCall.args[0], 1)

  handler1(1)

  handler2(2)
  assert.equal(next.callCount, 1)

  assert.end()
})
