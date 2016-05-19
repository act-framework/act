import test from 'tape'
import main from '../'
import { spy } from 'sinon'
import identity from 'ramda/src/identity'

test('main: renders simple string', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  const { dom } = main('Hello world', {node: mockNode})
  assert.equal(dom.tagName, 'SPAN')
  assert.equal(dom.children[0].text, 'Hello world')

  assert.end()
})

test('main: renders simple tag', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  const { dom } = main(['h1', 'Hello world'], {node: mockNode})
  assert.equal(dom.tagName, 'H1')
  assert.equal(dom.children[0].text, 'Hello world')

  assert.end()
})

test('main: renders simple function', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  const { dom } = main(() => ['h1', 'Hello world'], {node: mockNode})
  assert.equal(dom.tagName, 'H1')
  assert.equal(dom.children[0].text, 'Hello world')

  assert.end()
})

test('main: rerenders with new value', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  const { dom, update } = main(
    identity,
    {
      model: 'Kripke',
      node: mockNode
    }
  )
  assert.equal(dom.children[0].text, 'Kripke')
  const newDOM = update('name', 'Austin')
  assert.equal(newDOM.children[0].text, 'Austin')
  assert.end()
})

test('main: rerenders with subscription', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  let subscriptionEmitter
  const mockSubscription = (fn) => {
    subscriptionEmitter = fn
  }

  const { dom } = main(
    identity,
    {
      model: 'Anscombe',
      node: mockNode,
      subscriptions: [mockSubscription]
    }
  )

  assert.equal(dom.children[0].text, 'Anscombe')
  const dom2 = subscriptionEmitter('Mill')
  assert.equal(dom2.children[0].text, 'Mill')
  const dom3 = subscriptionEmitter('Kant')
  assert.equal(dom3.children[0].text, 'Kant')

  assert.end()
})

test('main: calls storage functions when value changes', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }
  const mockStorage = { get: () => 'Plato', set: spy() }

  const { dom, update } = main(
    identity,
    {
      model: 'Aristotle',
      node: mockNode,
      storage: mockStorage
    }
  )
  assert.equal(dom.children[0].text, 'Plato')
  update('name', 'Socrates')
  assert.ok(mockStorage.set.calledWith('Socrates'))

  assert.end()
})
