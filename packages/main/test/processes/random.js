import test from 'tape'
import random from '../../processes/random'
import { getNext } from '../helpers'

test('processes: random', (assert) => {
  Math.random = () => 6
  getNext(random, (handler, next) => {
    handler()
    assert.deepEqual(next.lastCall.args, [6])
  })

  assert.end()
})

