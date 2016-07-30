import test from 'tape'
import fromEvent from '../../../signals/sources/fromEvent'
import { spy } from 'sinon'

test('fromEvent', (assert) => {
  const addEventListener = spy()
  const node = { addEventListener }
  const signal = fromEvent(node, 'click', false)

  assert.equal(typeof signal.start, 'function', 'start is function')
  assert.equal(typeof signal.stop, 'function', 'stop is function')

  const empty = () => {}
  signal.start()(empty)

  assert.ok(addEventListener.calledWith('click', empty, false), 'add event listener to element')

  assert.end()
})
