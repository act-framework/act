import test from 'tape'
import valueOnEnter from '../../processes/valueOnEnter'
import { getNext } from '../helpers'

test('processes: valueOnEnter', (assert) => {
  getNext(valueOnEnter, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, ['foo'])

    handler({ target: { value: 'foo' }, keyCode: 6 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})
