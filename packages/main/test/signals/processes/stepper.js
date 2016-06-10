import test from 'tape'
import stepper from '../../../signals/processes/stepper'
import { spy } from 'sinon'

test('stepper', (assert) => {
  const signal = spy()
  const step = stepper(0, signal)

  const handler = signal.getCall(0).args[0]

  assert.equal(step(), 0)
  handler(1)
  assert.equal(step(), 1)
  handler(2)
  assert.equal(step(), 2)

  assert.end()
})
