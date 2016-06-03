import test from 'tape'
import { main } from '../helpers/test'
import { spy } from 'sinon'
import identity from 'ramda/src/identity'
import map from 'ramda/src/map'
import forEach from 'ramda/src/forEach'
import prop from 'ramda/src/prop'
import props from 'ramda/src/props'
import TraversableHistory from '../internals/TraversableHistory'
import { mouse } from '../internals/events'
import * as mouseEvents from '../helpers/test/mouseEvents'
import { keyboard } from '../internals/events'
import * as keyboardEvents from '../helpers/test/keyboardEvents'
import valueAndKeyCode from '../processes/valueAndKeyCode'
import { form } from '../internals/events'
import * as formEvents from '../helpers/test/formEvents'
import naiveSerialize from '../processes/naiveSerialize'
import { input } from '../internals/events'
import * as inputEvents from '../helpers/test/inputEvents'
import value from '../processes/value'

test('main: dom', (assert) => {
  // tag
  let { dom } = main('Locke')
  assert.deepEqual([dom.tagName, dom.children[0].text], ['SPAN', 'Locke'], 'render just string')
  assert.equal(main(['i']).dom.tagName, 'I', 'renders tag')

  // simple children
  assert.equal(main(['i', {}, 'Russeau']).dom.children[0].text, 'Russeau', 'renders tag with string child')
  assert.equal(main(['i', {}, 0]).dom.children[0].text, '0', 'renders tag with numeric child')
  assert.equal(main(['i', {}, false]).dom.children[0], undefined, 'does not render false children')
  assert.equal(main(['i', {}, null]).dom.children[0], undefined, 'does not render null children')
  assert.equal(main(['i', {}, []]).dom.children[0], undefined, 'does not render null children')

  //assert.equal(main(['i', {}, () => {}]).dom.children[0], undefined, 'does not render null children')

  // properties
  ;[{}, false, null, undefined].forEach((empty) => {
    assert.deepEqual(main(['i', empty]).dom.properties, {}, `empty properties for ${JSON.stringify(empty)}`)
  })
  assert.equal(
    main(['i', {name: 'Priestley'}]).dom.properties.name,
    'Priestley',
    'sets single property'
  )
  assert.deepEqual(
    main(['i', {name: 'Goodman', color: 'grue'}]).dom.properties,
    {name: 'Goodman', color: 'grue'},
    'sets multiple properties'
  )

  // complex children
  assert.equal(
    main(['i', [['u']]]).dom.children[0].tagName,
    'U',
    'renders single child tag'
  )
  assert.deepEqual(
    map(prop('tagName'), main(['i', [['u'], ['a'], ['em']]]).dom.children),
    ['U', 'A', 'EM'],
    'renders multiple children tags'
  )

  assert.deepEqual(
    map(props(['tagName', 'text']), main(['i', [['u'], 'Maimonides', ['em'], 'Gersonides']]).dom.children),
    [['U', undefined], [undefined, 'Maimonides'], ['EM', undefined], [undefined, 'Gersonides']],
    'renders mixed children'
  )

  const grandchildren = main(['i', [['u', [['a', 'Morgenbesser']]]]]).dom.children[0].children[0]
  assert.deepEqual(
    [grandchildren.tagName, grandchildren.children[0].text],
    ['A', 'Morgenbesser'],
    'renders grandchildren tags and text'
  )

  assert.end()
})

test('main: bad input value', (assert) => {
  assert.throws(() =>
    main(['input', {value: []}]))

  assert.end()
})

test('main: good input value', (assert) => {
  assert.equal(
    main(['input', {value: 'good'}]).dom.properties.value.value,
    'good'
  )

  assert.end()
})

test('main: renders simple function', (assert) => {
  const { dom } = main(() => ['h1', 'Hello world'])
  assert.equal(dom.tagName, 'H1')
  assert.equal(dom.children[0].text, 'Hello world')

  assert.end()
})

test('main: side effect action', (assert) => {
  const sideEffect = spy()
  const view = ['button', {click: sideEffect}]
  const { dom } = main(view)
  mouseEvents['click'](dom)
  assert.ok(
    sideEffect.called,
    'calls side effect action when event is triggered'
  )

  assert.end()
})

test('main: history.push', (assert) => {
  const { dom, history } = main(identity, { model: 'Kripke' })

  assert.equal(dom.children[0].text, 'Kripke')
  const newDOM = history.push({ type: 'name', payload: 'Austin' })
  assert.equal(newDOM.children[0].text, 'Austin')
  assert.end()
})

test('main: subscription', (assert) => {
  let subscriptionEmitter
  const mockSubscription = (fn) => {
    subscriptionEmitter = fn
  }

  const { dom } = main(
    identity,
    {
      model: 'Anscombe',
      subscriptions: { mockSubscription }
    }
  )

  assert.equal(dom.children[0].text, 'Anscombe')
  assert.equal(subscriptionEmitter('Mill').children[0].text, 'Mill')
  assert.equal(subscriptionEmitter('Kant').children[0].text, 'Kant')

  assert.end()
})

test('main: side effect subscription', (assert) => {
  const sideEffect = spy()
  let subscriptionEmitter
  const mockSubscription = (fn) => {
    subscriptionEmitter = fn
  }

  main(
    identity,
    {
      model: 'Thales',
      subscriptions: [[sideEffect, mockSubscription]]
    }
  )

  subscriptionEmitter('Bentham')
  assert.equal(sideEffect.lastCall.args[0], 'Bentham')

  assert.end()
})

test('main: calls storage functions when value changes', (assert) => {
  const mockStorage = { get: () => 'Plato', set: spy() }

  const { history } = main(
    identity,
    {
      model: 'Aristotle',
      storage: mockStorage
    }
  )
  history.push({ type: 'name', payload: 'Socrates' })
  assert.ok(mockStorage.set.calledWith('Socrates'))

  assert.end()
})

test('main: history.undo/redo', (assert) => {
  const { history } = main(identity, { model: 'Heraclitus', historyClass: TraversableHistory })

  history.push({ type: 'name', payload: 'Parmenides' })
  const dom = history.push({ type: 'name', payload: 'Anaximander' })
  assert.equal(dom.children[0].text, 'Anaximander')

  assert.equal(history.undo().children[0].text, 'Parmenides')
  assert.equal(history.undo().children[0].text, 'Heraclitus')
  assert.equal(history.undo(), undefined, 'can not undo if in the beginning of the timeline')
  assert.equal(history.redo().children[0].text, 'Parmenides')
  assert.equal(history.redo().children[0].text, 'Anaximander')
  assert.equal(history.redo(), undefined, 'can not redo if at the end of timeline')

  assert.end()
})

test('main: history.go', (assert) => {
  const { history } = main(identity, { model: 'Anaximenes', historyClass: TraversableHistory })

  history.push({ type: 'name', payload: 'Plutarchus' })
  history.push({ type: 'name', payload: 'Plotinus' })

  assert.equal(history.go(-1), undefined, 'does not rerended if negative present')
  assert.equal(history.go(0).children[0].text, 'Anaximenes')
  assert.equal(history.go(1).children[0].text, 'Plutarchus')
  assert.equal(history.go(2).children[0].text, 'Plotinus')
  assert.equal(history.go(2), undefined, 'does not rerended if same present')
  assert.equal(history.go(3), undefined, 'does not rerended if present bigger than timeline')

  assert.end()
})


test('main: mouse events', (assert) => {
  forEach((mouseEvent) => {
    const view = ['button', {[mouseEvent]: {add: 1}}]

    const { dom, history } = main(view, { historyClass: TraversableHistory })
    mouseEvents[mouseEvent](dom)
    assert.deepEqual(
      history.current,
      { type: 'add', payload: 1 },
      `executes mouse event ${mouseEvent}`
    )
  }, mouse)

  assert.end()
})

test('main: keyboard events', (assert) => {
  forEach((keyboardEvent) => {
    const view = ['button', {[keyboardEvent]: {get: valueAndKeyCode}}]
    const randomKeyCode = parseInt(Math.random() * 20 + 1)
    const { dom, history } = main(view, { historyClass: TraversableHistory })
    keyboardEvents[keyboardEvent](dom, randomKeyCode, keyboardEvent)
    assert.deepEqual(
      history.current,
      { type: 'get', payload: [keyboardEvent, randomKeyCode] },
      `executes keyboard event ${keyboardEvent}`
    )
  }, keyboard)

  assert.end()
})

test('main: form events', (assert) => {
  forEach((formEvent) => {
    const view = ['form', {[formEvent]: {data: naiveSerialize}}]

    const { dom, history } = main(view, { historyClass: TraversableHistory })
    formEvents[formEvent](dom, {name: 'Freud', age: 33})
    assert.deepEqual(
      history.current,
      { type: 'data', payload: {name: 'Freud', age: 33} },
      `executes form event ${formEvent}`
    )
  }, form)

  assert.end()
})

test('main: input events', (assert) => {
  forEach((inputEvent) => {
    const view = ['input', {[inputEvent]: {value: value}}]
    const { dom, history } = main(view, { historyClass: TraversableHistory })
    inputEvents[inputEvent](dom, inputEvent)
    assert.deepEqual(
      history.current,
      { type: 'value', payload: inputEvent },
      `executes input event ${inputEvent}`
    )
  }, input)

  assert.end()
})
