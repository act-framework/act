import test from 'tape'
import main from '../'
import { spy } from 'sinon'

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

test('main: renders updating function', (assert) => {
  const insertBefore = spy()
  const mockNode = { insertBefore }

  const { dom, update } = main((name) => ['h1', `Hello ${name}`], {model: "Kripke", node: mockNode})
  assert.equal(dom.tagName, 'H1')
  assert.equal(dom.children[0].text, 'Hello Kripke')

  update('name', 'Austin')
  assert.equal(dom.tagName, 'H1')
  assert.equal(dom.children[0].text, 'Hello Austin')

  assert.end()
})


