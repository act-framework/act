import test from 'tape'
import traversableHistory from '../../internals/traversableHistory'
import { spy } from 'sinon'
import add from 'ramda/src/add'

const renderer = spy()
const { push, go } = traversableHistory(0, add, renderer)

test('traversableHistory: push', (assert) => {
  push(1)
  assert.ok(renderer.calledWith(1))
  push(2)
  assert.ok(renderer.calledWith(3))

  assert.end()
})

test('traversableHistory: go', (assert) => {
  push(1)
  push(2)
  go(0)
  assert.deepEqual(renderer.lastCall.args, [0])
  go(1)
  assert.deepEqual(renderer.lastCall.args, [1])
  go(2)
  assert.deepEqual(renderer.lastCall.args, [3])

  assert.end()
})
