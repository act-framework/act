import test from 'tape'
import always from '../../../signals/processes/always'
import { spy } from 'sinon'

test('always', (assert) => {
  const signal = spy()
  const next = spy()
  always(100)(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  assert.ok(next.calledWith(100), 'given 1, always returns same value: 100')
  handler(2)
  assert.ok(next.calledWith(100), 'given 2, always returns same value: 100')

  assert.end()
})
