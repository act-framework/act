import test from 'tape'
import jsonToVirtualDOM from '../src/jsonToVirtualDOM'

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

/*
test('h with children', function (assert) {
    const node = jsonToVirtualDOM('div', [jsonToVirtualDOM('span')])

    assert.equal(node.children[0].tagName, 'SPAN')

    assert.end()
})

test('h with null', function (assert) {
    const node = jsonToVirtualDOM('div', null)
    const node2 = jsonToVirtualDOM('div', [null])

    assert.equal(node.children.length, 0)
    assert.equal(node2.children.length, 0)

    assert.end()
})

test('h with undefined', function (assert) {
    const node = jsonToVirtualDOM('div', undefined)
    const node2 = jsonToVirtualDOM('div', [undefined])

    assert.equal(node.children.length, 0)
    assert.equal(node2.children.length, 0)

    assert.end()
})

test('h with foreign object', function (assert) {
    const errorSingleChild

    try {
        jsonToVirtualDOM('div', null, { foreign: 'object' })
    } catch (e) {
        errorSingleChild = e
    }

    const errorChildren

    try {
        jsonToVirtualDOM('div', [{ foreign: 'object' }])
    } catch (e) {
        errorChildren = e
    }

    assert.ok(errorSingleChild);
    assert.ok(/Unexpected virtual child/.test(errorSingleChild.message))

    assert.ok(errorChildren);
    assert.ok(/Unexpected virtual child/.test(errorChildren.message))

    assert.end()
})

test('h with class', function (assert) {
    const node = jsonToVirtualDOM('.foo')

    assert.equal(node.properties.className, 'foo')

    assert.end()
})

test('h with id', function (assert) {
    const node = jsonToVirtualDOM('#foo')

    assert.equal(node.properties.id, 'foo')

    assert.end()
})

test('h with empty string', function (assert) {
    const node = jsonToVirtualDOM('')

    assert.equal(node.tagName, 'DIV')

    assert.end()
})

test('h with two classes', function (assert) {
    const node = jsonToVirtualDOM('.foo', { className: 'bar' })

    assert.equal(node.properties.className, 'foo bar')

    assert.end()
})

test('h with two ids', function (assert) {
    const node = jsonToVirtualDOM('#foo', { id: 'bar' })

    assert.equal(node.properties.id, 'bar')

    assert.end()
})
*/
