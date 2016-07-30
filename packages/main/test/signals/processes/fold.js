import test from 'tape'
import fold from '../../../signals/processes/fold'
import { spy } from 'sinon'
import add from 'ramda/src/add'

test('fold', (assert) => {
  const signal = spy()
  const next = spy()
  fold(add, 0)(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  handler(2)
  handler(3)
  assert.equal(next.getCall(0).args[0], 1)
  assert.equal(next.getCall(1).args[0], 3)
  assert.equal(next.getCall(2).args[0], 6)

  assert.end()
})
