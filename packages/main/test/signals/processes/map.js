import test from 'tape'
import map from '../../../signals/processes/map'
import { spy } from 'sinon'
import add from 'ramda/src/add'

test('map', (assert) => {
  const signal = spy()
  const next = spy()
  map(add(5))(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(5)
  assert.ok(next.calledWith(10))

  assert.end()
})
