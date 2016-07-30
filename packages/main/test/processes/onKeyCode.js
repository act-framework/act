import test from 'tape'
import onKeyCode from '../../processes/onKeyCode'
import { getNext } from '../helpers'

test('processes: onKeyCode', (assert) => {
  getNext(onKeyCode(66), (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 66 })
    assert.deepEqual(next.lastCall.args, [66])

    handler({ target: { value: 'foo' }, keyCode: 67 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

