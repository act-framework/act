# Testing

##### React

In React there are mainly two approaches for testing components: shallow and
deep rendering.

  1) Shallow rendering means you'll render your component without the need of a
  DOM , but you can't render deeply nested components, and you'll test events
  by using mock helpers. Here's how verbose this is:

  ```js
  import React from 'react/addons'
  import TestUtils from 'react-addons-test-utils'
  import Component from './path/to/Component'

  const renderer = TestUtils.createRenderer()
  renderer.render(<Component className='MyComponent'></Component>)

  const component = renderer.getRenderOutput();

  // now you're ready to test
  assert.equal(component.type, 'div');
  ```

  There are a couple of libraries to simplify and reduce this boilerplate, like
  [skin-deep](https://github.com/glenjamin/skin-deep) and [enzyme](https://github.com/airbnb/enzyme).

  2) Deep rendering means rendering to a DOM, and that makes your tests not
  really unit tests, but something between unit and integration tests. This
  approach requires more setup and may be slower, but has the great advantage
  of testing "the real thing", and you can run it in real devices using
  something like [karma](https://karma-runner.github.io/).

  If you run your tests that way, you'll probably also use [Jest](https://facebook.github.io/jest/docs/tutorial-react.html)
  a testing framework built by Facebook on top of [Jasmine](http://jasmine.github.io/).
  The main advantage of Jest is the "auto mock" functionality, that truly
  isolates your module for testing. (If you're confused by the term "mock"
  here, don't worry, it is used for many different things in the Node world. In
  this case, a mock means being able to override parts of modules, or entire
  modules, like in libraries as [rewire](https://github.com/jhnns/rewire))

  Here's an example (from Jest docs):

  ```js
  jest.unmock('./path/to/CheckboxWithLabel');

  import React from 'react'
  import ReactDOM from 'react-dom'
  import TestUtils from 'react-addons-test-utils'
  import CheckboxWithLabel from './path/to/CheckboxWithLabel'

  describe('Component', () => {

    it('changes the text after click', () => {
      // Render a checkbox with label in the document
      const checkbox = TestUtils.renderIntoDocument(
        <CheckboxWithLabel labelOn="On" labelOff="Off" />
      )

      const checkboxNode = ReactDOM.findDOMNode(checkbox)

      // Verify that it is Off by default
      expect(checkboxNode.textContent).toEqual('Off')

      // Simulate a click and verify that it is now On
      TestUtils.Simulate.change(
        TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
      );
      expect(checkboxNode.textContent).toEqual('On')
    });

  });
  ```

##### Act

In Act you can also do shallow and deep rendering, but we don't want to
emphasize this distiction. Simply think about unit and integration test and
you'll be good to go. Actually, Act doesn't care how you do integration tests,
you just open your page with your javascript and run your tests normally.

For unit tests, Act will behave as in React's shallow render mechanism, but
most of the time you don't really need to render things. This is because Act
uses plain JSON for defining components, and your functions simply return JSON.
Therefore, you can test a very simple component like this:

```js
const simpleComponent = (name) => ['h1', `Hello ${name}`]

deepEqual(
  simpleComponent('Wittgenstein'),
  ['h1', 'Hello Wittgenstein']
)
```

Since Act does more than just the view, you can test the other parts of your
app with the same simplicity. An initial model would be tested this way:

```js
const initialModel = { notes: [] }

deepEqual(initialModel, { notes: [] })
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

You can know more checking the unit_test folder under examples.
