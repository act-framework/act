import test from 'tape'
import History from '../../internals/History'
import { spy } from 'sinon'
import add from 'ramda/src/add'

const renderer = spy()
const h = new History(0, add, renderer)

test('History: push', (assert) => {
  h.push(1)
  assert.ok(renderer.calledWith(1))
  h.push(2)
  assert.ok(renderer.calledWith(3))

  assert.end()
})
