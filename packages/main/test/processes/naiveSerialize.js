import test from 'tape'
import naiveSerialize from '../../processes/naiveSerialize'
import { getNext } from '../helpers'
import { spy } from 'sinon'

test('processes: naiveSerialize', (assert) => {
  const ev = { preventDefault: spy(), target: [{ name: 'foo', value: 'bar' }] }

  getNext(naiveSerialize, (handler, next) => {
    handler(ev)
    assert.deepEqual(next.lastCall.args, [{ foo: 'bar' }])
    assert.ok(ev.preventDefault.called)
  })

  assert.end()
})
