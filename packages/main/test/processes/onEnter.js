import test from 'tape'
import onEnter from '../../processes/onEnter'
import { getNext } from '../helpers'

test('processes: onEnter', (assert) => {
  getNext(onEnter, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, [13])

    handler({ target: { value: 'foo' }, keyCode: 14 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

