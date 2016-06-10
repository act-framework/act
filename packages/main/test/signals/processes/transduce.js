import test from 'tape'
import transduce from '../../../signals/processes/transduce'
import { spy } from 'sinon'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import filter from 'ramda/src/filter'
import add from 'ramda/src/add'
import multiply from 'ramda/src/multiply'
import lt from 'ramda/src/lt'
import __ from 'ramda/src/__'

test('transduce: with result', (assert) => {
  const addAndMult = compose(map(add(1)), map(multiply(2)))
  const signal = spy()
  const next = spy()
  transduce(addAndMult)(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  assert.equal(next.getCall(0).args[0], 4, 'given 1, returns 4')
  handler(2)
  assert.equal(next.getCall(1).args[0], 6, 'given 2, returns 6')

  assert.end()
})

test('transduce: without result', (assert) => {
  const addAndFilter = compose(map(add(1)), filter(lt(__, 3)))

  const signal = spy()
  const next = spy()
  transduce(addAndFilter)(signal)(next)

  const handler = signal.getCall(0).args[0]

  handler(1)
  assert.equal(next.getCall(0).args[0], 2, 'given 1, returns 2')
  handler(2)
  assert.ok(!next.getCall(1), 'does not call if filtered')

  assert.end()
})

