import test from 'tape'
import traversableHistory from '../../internals/traversableHistory'
import { spy } from 'sinon'
import add from 'ramda/src/add'

test('traversableHistory.push', (assert) => {
  const renderer = spy()
  const { push } = traversableHistory(0, add, renderer)

  push(1)
  assert.ok(renderer.calledWith(1))
  push(2)
  assert.ok(renderer.calledWith(3))

  assert.end()
})

test('traversableHistory.go', (assert) => {
  const renderer = spy()
  const { push, go } = traversableHistory(0, add, renderer)

  push(1)
  push(2)
  go(0)
  assert.equal(renderer.lastCall.args[0], 0)
  go(1)
  assert.equal(renderer.lastCall.args[0], 1)
  go(2)
  assert.equal(renderer.lastCall.args[0], 3)

  assert.end()
})
