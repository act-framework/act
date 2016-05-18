import test from 'tape'
import counter from './counter'

/*
 * Testing the view
 */

// You can test the whole renderer if you want, it's just JSON...
test('view', (assert) => {
  assert.deepEqual(
    counter.view(10),
    ['.counter', [
      ['h1', 10],
      ['button', {click: {add: 1}}, 'Add 1'],
      ['button', {click: {add: -1}}, 'Remove 1']
    ]])
  assert.end()
})

import view from 'ramda/src/view'
import lensPath from 'ramda/src/lensPath'

// You can use some lens helpers to get some specific stuff
const getCount = view(lensPath([1, 0, 1]))

test('view renders count', (assert) => {
  assert.deepEqual(
    getCount(counter.view(10)),
    10)
  assert.end()
})

// You can use chai-virtual-dom, with the toVDOM helper
// Try chanfing the `.counter` class to see it failing
// Read more at https://github.com/staltz/chai-virtual-dom
// NOTE: This example doesn't _really_ work for tape, it's
// supposed to be done with mocha

import chai from 'chai'
const expect = chai.expect
import chaiVDOM from 'chai-virtual-dom'
chai.use(chaiVDOM)

import { toVDOM } from '../../src/testHelpers'

test('using chai vdom', (assert) => {
  const expected = toVDOM(['.counter', [['h1', 10]]])
  const myVTree = toVDOM(counter.view(10))
  expect(myVTree).to.look.like(expected)

  assert.end()
})

/*
 * Testing the model
 */

// Duh
test('model', (assert) => {
  assert.equal(counter.model, 0)
  assert.end()
})

/*
 * Testing the reducer
 */

test('reducer: add -1', (assert) => {
  assert.equal(counter.reducer(0, {type: 'add', payload: +1}), 1)

  assert.end()
})

test('reducer: add -1', (assert) => {
  assert.equal(counter.reducer(0, {type: 'add', payload: -1}), -1)

  assert.end()
})

test('reducer: unexpected action', (assert) => {
  assert.equal(counter.reducer(0, {type: 'undexpected'}), 0)
  assert.end()
})

/*
 * Testing events
 */

import { click } from '../../src/testHelpers'

// TODO: would be nice to have a finder,
// so instead of `myVTree.children[1]`
// do find('button:first-child', myVTree)

test('click updates correctly', (assert) => {
  const myVTree = toVDOM(counter.view(10))

  assert.deepEqual(
    click(myVTree.children[1]),
    {type: 'add', payload: 1}
  )

  assert.deepEqual(
    click(myVTree.children[2]),
    {type: 'add', payload: -1}
  )

  assert.end()
})

import { keyup } from '../../src/testHelpers'
import copy from './copy'

test('keyup updates correctly', (assert) => {
  const myVTree = toVDOM(copy.view())

  // Non enter keyCode
  assert.notOk(
    keyup(42, 'foo', myVTree.children[1])
  )

  assert.deepEqual(
    keyup(13, 'foo', myVTree.children[1]),
    {type: 'update', payload: 'foo'}
  )

  assert.end()
})
