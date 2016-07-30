import test from 'tape'
import merge from '../../../signals/processes/merge'
import { spy } from 'sinon'
import map from 'ramda/src/map'

test('merge', (assert) => {
  const signals = [
    spy(), spy(), spy()
  ]
  const next = spy()
  merge(...signals)(next)

  const handlers = map((signal) => signal.getCall(0).args[0], signals)

  handlers[0]('a')
  assert.deepEqual(next.lastCall.args[0], 'a')
  handlers[1]('b')
  assert.deepEqual(next.lastCall.args[0], 'b')
  handlers[2]('c')
  assert.deepEqual(next.lastCall.args[0], 'c')

  assert.end()
})
