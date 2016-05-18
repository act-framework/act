import test from 'tape'
import buildReducer from '../src/buildReducer'
import add from 'ramda/src/add'
import subtract from 'ramda/src/subtract'

test('returns the reducer if exists', (assert) => {
  assert.equal(buildReducer('reducer', {}), 'reducer')

  assert.end()
})

test('returns function if reducer absent', (assert) => {
  assert.equal(
    typeof buildReducer(null, {}),
    'function'
  )

  assert.end()
})

test('returns the reducer if exists', (assert) => {
  const events = {
    add: [0, 0, 0, add],
    subtract: [0, 0, 0, subtract]
  }

  const reducer = buildReducer(null, events)

  assert.deepEqual(
    reducer(5, { payload: 5, type: 'add' }),
    10
  )

  assert.deepEqual(
    reducer(5, { payload: 5, type: 'subtract' }),
    0
  )

  assert.end()
})
