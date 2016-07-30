import test from 'tape'
import count from '../../processes/count'
import { getNext } from '../helpers'

test('processes: count', (assert) => {
  getNext(count, (handler, next) => {
    handler()
    assert.deepEqual(next.lastCall.args, [1])

    handler()
    assert.deepEqual(next.lastCall.args, [2])

    handler()
    assert.deepEqual(next.lastCall.args, [3])
  })

  assert.end()
})
