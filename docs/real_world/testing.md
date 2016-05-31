# Testing

Act only cares and helps you when it comes to unit testing, and is agnostic
about integration tests. For integration, you can use pretty much any framework
you like.

Since Act uses [sort of] plain JSON for defining components, you can test a very
simple component like this:

```js
const simpleComponent = (name) => ['h1', `Hello ${name}`]

deepEqual(
  simpleComponent('Wittgenstein'),
  ['h1', 'Hello Wittgenstein']
)
```

You can test the other parts of your app with the same simplicity. An initial
model would be tested this way:

```js
const model = { notes: [] }

deepEqual(model, { notes: [] })
```

And a reducer:

```js
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'add':
      return state + payload
    case 'sub':
      return state - payload
  }
  return state
}

equal(reducer(0, { type: 'add', payload: 10}), 10, 'adds correctly')

equal(reducer(0, { type: 'sub', payload: 10}), -10, 'subtracts correctly')

equal(reducer(0, { type: 'mul', payload: 10}), 0, 'does not multiply')
```

Finally, if you have events (both simple events and signals) you get some
helpers (`toVDOM`, `click` and `keyup` are imported from `testHelpers`) to make
sure they will feed your reducer correctly.

A simple event example:

```js
const button = ['button', {click: {someAction: 10}}]

assert.deepEqual(
  click(toVDOM(button())),
  {type: 'someAction', payload: 10}
)
```

Signal example:

```js
const input = ['input', {keyup: {someAction: valueOnEnter}}]

// Non enter keyCode
notOk(keyup(42, 'Russell', toVDOM(input)))

deepEqual(
  keyup(13, 'Russell', toVDOM(input)),
  {type: 'someAction', payload: 'Russell'}
)
```

## Testing with `main`

If you want to test some module that doesn't export its parts (view, model,
reducer...), like the file that renders `main`, you can use the `main` function
in `testHelpers`. It mocks only the DOM node where your app is mounted, but
behaves pretty much like the real `main` in other ways.

Since main returns an object with the initial virtual dom, and the history
object, you should use those to inspect what happens:

```
// your module
const view = (count) => ['button', { click: { add: 1 } }, count]

const reducer = (state = 0, { type, payload }) =>
  type === 'add'
    ? state + payload
    : state

export default main(view, { reducer })

// your test
import { dom, history } from './path/to/myModule'
import { click } from '@act/main/testHelpers'

assert.equal(dom.tagName, 'button')
assert.equal(dom.children[0].text, '0')
assert.equal(history.current, undefined)
const newDOM = click(dom)
assert.equal(newDOM.children[0].text, '1')
assert.equal(history.current, { type: 'add', payload: 1 })
```

You can know more checking the unit_test folder under examples.
