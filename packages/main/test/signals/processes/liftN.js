import test from 'tape'
import stepper from '../../../signals/processes/stepper'
import liftN from '../../../signals/processes/liftN'
import { spy } from 'sinon'
import map from 'ramda/src/map'
import addIndex from 'ramda/src/addIndex'
import flip from 'ramda/src/flip'

const mapIndexed = addIndex(map)

test('liftN', (assert) => {
  const signals = [spy(), spy(), spy()]
  const steps = mapIndexed(flip(stepper), signals)

  const handlers = map((signal) => signal.getCall(0).args[0], signals)

  assert.equal(steps[0](), 0)
  assert.equal(steps[1](), 1)
  assert.equal(steps[2](), 2)

  const sumAll = liftN((a, b, c) => a + b + c, ...steps)

  assert.equal(sumAll(), 3) // 0 + 1 + 2
  handlers[0](6)
  assert.equal(sumAll(), 9) // 6 + 1 + 2
  handlers[1](7)
  assert.equal(sumAll(), 15) // 6 + 7 + 2
  handlers[2](8)
  assert.equal(sumAll(), 21) // 6 + 7 + 8

  assert.end()
})
