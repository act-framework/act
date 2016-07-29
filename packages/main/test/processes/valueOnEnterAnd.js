import test from 'tape'
import valueOnEnterAnd from '../../processes/valueOnEnterAnd'
import { getNext } from '../helpers'

test('processes: valueOnEnterAnd', (assert) => {
  getNext(valueOnEnterAnd({ horsemen: 4 }), (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, [{ value: 'foo', horsemen: 4 }])

    handler({ target: { value: 'foo' }, keyCode: 6 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})
