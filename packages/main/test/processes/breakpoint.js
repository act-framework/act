import test from 'tape'
import breakpoint from '../../processes/breakpoint'
import { getNext } from '../helpers'

test('processes: breakpoint', (assert) => {
  getNext(breakpoint({a: 1500, b: 500, c: 0}), (handler, next) => {
    handler({ target: { innerWidth: 0 } })
    assert.deepEqual(next.lastCall.args, ['c'])

    handler({ target: { innerWidth: 500 } })
    assert.deepEqual(next.lastCall.args, ['b'])

    handler({ target: { innerWidth: 1500 } })
    assert.deepEqual(next.lastCall.args, ['a'])
  })

  assert.end()
})

