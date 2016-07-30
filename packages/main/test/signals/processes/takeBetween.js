import test from 'tape'
import takeBetween from '../../../signals/processes/takeBetween'
import { spy } from 'sinon'

test('takeBetween', (assert) => {
  const signalSwitch = spy()
  const signalValues = spy()
  const next = spy()
  takeBetween(signalSwitch, signalValues, next)

  const handlerSwitch = signalSwitch.getCall(0).args[0]
  const handlerValues = signalValues.getCall(0).args[0]

  handlerValues(1)
  assert.equal(next.callCount, 0)

  handlerSwitch(1)

  handlerValues(2)
  assert.equal(next.callCount, 1)
  assert.equal(next.lastCall.args[0], 2)

  handlerValues(3)
  assert.equal(next.callCount, 2)
  assert.equal(next.lastCall.args[0], 3)

  handlerSwitch(2)

  handlerValues(4)
  assert.equal(next.callCount, 2)

  assert.end()
})
