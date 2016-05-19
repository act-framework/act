import test from 'tape'
import jsonToVirtualDOM from '../internals/jsonToVirtualDOM'

test('jsonToVirtualDOM returns a vnode', (assert) => {
  assert.equal(jsonToVirtualDOM(['div']).tagName, 'DIV')

  assert.end()
})

test('jsonToVirtualDOM has props', (assert) => {
  assert.equal(jsonToVirtualDOM(['div', {
    foo: 'bar'
  }]).properties.foo, 'bar')

  assert.end()
})

test('with text', (assert) => {
  const node = jsonToVirtualDOM(['div', 'text'])

  assert.equal(node.children[0].text, 'text')

  assert.end()
})

test('with child', function (assert) {
  const node = jsonToVirtualDOM(['div', [['span']]])

  assert.equal(node.children[0].tagName, 'SPAN')

  assert.end()
})

test('with children', function (assert) {
  const node = jsonToVirtualDOM(['div', [['span'], ['h1'], ['input']]])

  assert.equal(node.children[0].tagName, 'SPAN')
  assert.equal(node.children[1].tagName, 'H1')
  assert.equal(node.children[2].tagName, 'INPUT')

  assert.end()
})

test('with mixed children', function (assert) {
  const node = jsonToVirtualDOM(['div', [['span'], 'Hey', ['h1'], 'Ho', ['input']]])

  assert.equal(node.children[0].tagName, 'SPAN')
  assert.equal(node.children[1].text, 'Hey')
  assert.equal(node.children[2].tagName, 'H1')
  assert.equal(node.children[3].text, 'Ho')
  assert.equal(node.children[4].tagName, 'INPUT')

  assert.end()
})

test('with text grandchild', function (assert) {
  const node = jsonToVirtualDOM(['div', [
    ['span', 'foo']
  ]])

  assert.equal(node.children[0].tagName, 'SPAN')
  assert.equal(node.children[0].children[0].text, 'foo')
  assert.end()
})

test('with tag grandchild', function (assert) {
  const node = jsonToVirtualDOM(['div', [
    ['span', [
      ['span', 'foo']
    ]]
  ]])

  assert.equal(node.children[0].tagName, 'SPAN')
  assert.equal(node.children[0].children[0].tagName, 'SPAN')
  assert.equal(node.children[0].children[0].children[0].text, 'foo')
  assert.end()
})

test.only('with attributes', function (assert) {
  const node = jsonToVirtualDOM(['input', {value: 'Morgenbesser'}])

  assert.equal(node.properties.value.value, 'Morgenbesser')

  assert.end()
})

test('with attributes and children', function (assert) {
  const node = jsonToVirtualDOM(['label', {for: 'name'}, 'name'])

  assert.equal(node.properties.htmlFor, 'name')
  assert.equal(node.children[0].text, 'name')

  assert.end()
})
