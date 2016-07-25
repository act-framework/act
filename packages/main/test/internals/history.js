import test from 'tape'
import history from '../../internals/history'
import { spy } from 'sinon'
import add from 'ramda/src/add'

test('history', (assert) => {
  const renderer = spy()
  const { push } = history(0, add, renderer)

  push(1)
  assert.ok(renderer.calledWith(1))
  push(2)
  assert.ok(renderer.calledWith(3))

  assert.end()
})
