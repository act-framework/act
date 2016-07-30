import test from 'tape'
import TraversableHistory from '../../internals/traversableHistory'
import { spy } from 'sinon'
import add from 'ramda/src/add'

const renderer = spy()
const h = new TraversableHistory(0, add, renderer)

test('TraversableHistory: push', (assert) => {
  h.push(1)
  assert.ok(renderer.calledWith(1))
  h.push(2)
  assert.ok(renderer.calledWith(3))

  assert.end()
})

test('TraversableHistory: go', (assert) => {
  h.push(1)
  h.push(2)
  h.go(0)
  assert.deepEqual(renderer.lastCall.args, [0])
  h.go(1)
  assert.deepEqual(renderer.lastCall.args, [1])
  h.go(2)
  assert.deepEqual(renderer.lastCall.args, [3])

  assert.end()
})
