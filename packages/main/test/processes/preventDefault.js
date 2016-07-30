import test from 'tape'
import preventDefault from '../../processes/preventDefault'
import { getNext } from '../helpers'
import { spy } from 'sinon'

test('processes: preventDefault', (assert) => {
  const ev = { preventDefault: spy() }
  getNext(preventDefault, (handler, next) => {
    handler(ev)
    assert.ok(ev.preventDefault.called)
  })

  assert.end()
})
