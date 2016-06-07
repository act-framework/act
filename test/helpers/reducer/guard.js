import test from 'tape'
import add from 'ramda/src/add'
import multiply from 'ramda/src/multiply'
import equals from 'ramda/src/equals'
import complement from 'ramda/src/complement'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'
import guard from '../../../helpers/reducer/guard'

test('guard: object', (assert) => {
  const reducer = guard({ add, multiply })

  assert.equal(
    reducer(10, { type: 'add', payload: 5 }),
    15
  )

  assert.equal(
    reducer(10, { type: 'multiply', payload: 5 }),
    50
  )
  assert.end()
})

test('guard: array', (assert) => {
  const reducer = guard([
    [equals('load'), set(lensProp('loading'), true)],
    [complement(equals('load')), set(lensProp('loading'), false)]
  ])

  assert.deepEqual(
    reducer({}, { type: 'load' }),
    { loading: true }
  )

  assert.deepEqual(
    reducer({}, { type: 'whatever' }),
    { loading: false }
  )
  assert.end()
})
