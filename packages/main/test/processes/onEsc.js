import test from 'tape'
import onEsc from '../../processes/onEsc'
import { getNext } from '../helpers'

test('onEsc', (assert) => {
  getNext(onEsc, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 27 })
    assert.deepEqual(next.lastCall.args, [27])

    handler({ target: { value: 'foo' }, keyCode: 28 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

