# For React developers

## JSX vs JSON

##### React

In React you either build your components manually – almost no one does that –
or you use JSX (to be fair there's also a [hyperscript](https://github.com/mlmorg/react-hyperscript)
library). JSX tries to emulate HTML, but it's different in many ways. Here's
some JSX:

```js
<h1 className='title'>
  { someVariable }
</h1>
```

##### Act

In Act, all views are defined in a JSON format. This is the syntax for a tag:

```js
[tagName, attributes, children]
```

Here, `tagName` is any HTML tag name, like `h1` or `div`. `attributes` is an
object with all tag's attributes, like `type` or `checked`. Finally, `children`
may be an array or a single item, like a string or a number.

Both `attributes` and `children` are optional, so, if you don't define any
attribute, the children will go on the second index of the array.

You can also use virtual-dom's special syntax for classes and ids (more on
"Class and id shortcuts" section below).

React's example above would be translated to:

```js
['h1.title', someVariable]
```

## Class and id shortcuts

##### React

Not there.

##### Act

In Act you have special shortcuts for some common attributes, that are inspired
by css selectos.

Instead of class, you can do:

```js
['.todo']
```

Instead of id, you can do:

```js
['#main']
```

In the examples above, Act will render a div tag, but you can also use these
shortcuts with any other tag:

```js
['h1.title']
```

## JS vs HTML names

##### React

In React you use the JS attribute names, like `htmlFor` and `className`.

```js
<label htmlFor='name'>Enter your name</label>
<input className='field' id='name' />
```

##### Act

In Act you can use regular HTML names like `for` and `class`.

```js
['label', {for: 'name'}, 'Enter your name']
['input#name', {class: 'field'}]
['input#name.field'] // even shorter
```

## class-names vs class-lists

##### React

In React you're supposed to use the `class-names` package to construct class
names that depend on certain conditions.

```js
import classNames from 'class-names'

// only true matters
const menuItem = ({ title, selected }) => (
  <li className={classNames({'is-selected': selected})}>
    {title}
  </li>
)

const items = [
  {title: 'Home', selected: true},
  {title: 'FAQ', selected: false}
]

// both matter
const menu = ({ open }) => (
  <ol id='menu' className={classNames({'is-open': open, 'is-closed': !open})}>
    {map(menuItem, items)}
  </oi>
)
```

##### Act

In Act you simply use lists, just like in the [`class-lists` package](https://www.npmjs.com/package/class-lists).

```js
// only true matters
const menuItem = ({ title, selected }) => (
  ['li', {class: [['is-selected': selected]]}, title]
)

const items = [
  {title: 'Home', selected: true},
  {title: 'FAQ', selected: false}
]

// both matter
const menu = ({ open }) => (
  ['ol#menu', {class: [[open: 'is-open', 'is-closed']]}, map(menuItem, items)]
)
```

## Events

##### React

In React, in practice, events are treated pretty much like in plain HTML,
although behind the scenes it's not quite (for instance, React events are
"synthetic"). If you do the following in HTML or in React you'll get the same
results:

```js
// html
<button onClick="() => alert('Hello!')">Say hello</button>

// react
<button onClick={() => alert('Hello!')}>Say hello</button>
```

True that most of the time instead of calling a function inline, you'll want to
run a method of your class. Given es6 classes don't autobind methods, that's
the favoured approach (I'm basing this assumption on eslint standards):

```js
class Hello extends React.Component {
  constructor (props) {
    super.props()

    this.hello = this.hello.bind(this)
  }

  hello () {
    alert('Hello!')
  }

  render () {
    return <button onClick={this.hello}>Say hello</button>
  }
}
```

But, in any event, when you reason about events in React, you can use your
intuitions based on your plain HTML experience.

##### React + Redux:

When you start building more complex apps, say, with Redux, or some other "flux
implementation", most of your events will actually dispatch some action, that
will be treated by a reducer and saved in your single store. There are plenty
of ways to accomplish that, since all you have to do is, given you have a
reference to the store, execute `store.dispatch(yourEvent())`, where
`yourEvent` returns an object represening an action, something like `{ type:
'someType', payload: 'someValue' }`.

The most common (and I suppose, prefered) way is to use `connect` to connect
your events to the store (do a `store.dispatch` behind the scenes) and receive
them as `props` in your component. To get there there's a bit of boilerplate
involved. First, you have to define your store and feed it your reducers. Then
you have to wrap your whole app into a "Provider":

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '../path/to/store'
import YourApp from '../path/to/YourApp'

const root = (
  <Provider store={store}>
    <YourApp />
  </Provider>
)

render(root, document.getElementById('root'))
```

Here is an example of action:

```js
export const updateName = (name) => ({
  type: 'UPDATE_NAME',
  payload: name
})
```

Then you can, at any component, connect it to the store data and actions:

```js
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateName } from '../path/to/actions'

const NameInput = (props) => {
  <input value={props.name} onChange={props.updateName} />
}

export default connect(
  ({ name }) => ({ name }),
  (dispatch) => bindActionCreators({ updateName }, dispatch)
)(NameInput)
```

This way, when you change the name on the input, it will send the action to
the reducer, and finally rerender the component (and all connected components)
with the new name.

##### Act

In Act events are not dealt like in plain HTML. This may sound bad for who's
starting, but it comes with nice perks. The way Act deals with events is closer
to Redux's way, but with some more details.

To simplify let's start with something that resembles Redux. We'll call this
"events that dispatch an action"

###### Events that dispatch an action

The syntax is `{click: handler}`, where
`click` is any DOM event like click, keyup, keydom, change, and so on, and
`handler` a function that you'll define. `handler` will receive both the event
object (so you can do things like `preventDefault`, `stopPropagation`, get key
codes or values from the target DOM element) and an `update` function. You can
think of this function as the `dispatch` in Redux, or some `setState` on
steroids :D.

```js
const handler (event, update) => {
  update('someAction', 'somePayload')
}

const button = () => ['button', {click: handler}]
```

That's the general syntax. `update` will send this to your reducer and your app
will rerender. There's no need for Providers or connects here. Since this
example is a little too simple, let's see a better one:

```js
import main from '@act/core'

const add (event, update) =>
  update('add', 1)

const view = (count) => ['button', {click: add}, count]

const reducer = (state, {type, payload}) =>
  type === 'add' ? state + payload : state

main(view, 0, reducer)
```

That's the whole app. When you click in the button, it calls add, that calls
the update, that calls the reducer that will rerender your whole app (yeah, ok,
just a button with a number).

###### Events with constant values

Now let's make it even simpler. Since most of the time you want to emit a
simple value from your events, like in the example above, you can reduce it to:

```js
import main from '@act/core'

const view = (count) => ['button', {click: {add: 1}}, count]

const reducer = (state, {type, payload}) =>
  type === 'add' ? state + payload : state

main(view, 0, reducer)
```

So we removed the handler and changed the syntax to be `{click: {add: 1}}`.
Again, `click` is any DOM event, but here `add` will be the `type` and `1` the
payload sent to the reducer when the event happens.

By now it seems this is just a simplified version of the above, and in practice
it is. But you'll learn in the next section that this builds a signal. So let's
understan that.

###### Events with signals

For many use cases you'll want to manipulate the event in order to get a
meaninful value from it. To do that you can totally just use a handler, as we
say above and use imperative programming to get it done. But there's a more
elegant way out there, and you'll certainly become a better programmer by
learning it. I'll call this "signals". I'll explain you what is a signal,
without all the technical language people generally use to explain them, but I
think that if you look at an example first, you'll just understand it:

```js
import main from '@act/core'
import { valueOnEnter } from 'act/processes'

const view = (value) => (
  ['div', [
    value,
    ['input', {keyup: {update: valueOnEnter}}]
  ]]
)

export const reducer = (state, {type, payload}) =>
  type === 'update' ? payload : state

main(view, '', reducer)
```

Looks simple, right? What this does is that is will send an action to the
reducer with type `update` and with the value of the field as the `payload`
only when the user hits enter, that's why we have this `valueOnEnter` there.

There are plenty of helpers like this in Act, to cover most of the common use
cases for web apps, just take a look at the processes.js file. If what you need
is not there, don't worry, you can create your own processes.

But wait, I was talking about signals, and now I mentioned processes! The
example was simple, but what all this means? Well, a signal has two parts, a
source and a process. A source can be a DOM event handler (like in the example
above) or can be an ajax call, a websocket connection, or anything that may
give us values. And a process is just a function that gets the value that the
source produces and returns a value that matters to us. Simple enough?

In our case, the source is the click DOM event of the input. The source is
attached automatically by Act. This source give us DOM events. What the process
`valueOnEnter` does is to get this event, fetch the value (like in
`event.target.value` and only update when the `even.keyCode` is an enter key.
So, as you can see, a process can not only manipulate the original value, but
also filter it and only let us now about it when it's really important.

The cool thing about processes is that they are composable. This means you can
define them piecemeal and then group them togheter. The two most important
processes you need to know about are `map` and `filter`.

So `map` takes a value and returns another value. One example is the `value`
process:

```js
const value = map((event) => event.target.value)
```

With this you can do things like `{change: {update: value}}`, so on every input
change it will send an action with type `update` and the value of the input.

And `filter` takes a value and decides whether this value is good or not. If it
is, it will pass it along the signal, else it will not:

```js
const isEnter = filter((event) => event.keyCode === 13)
```

So you can do `{keyup: {update: isEnter}`, and it will send an action if and
only if the typed character is enter (13). But notice that `filter` only
defines if the value is good, so it will pass `event` – the original value – as
the payload. Since we rarely (if ever) want to pass raw events to reducers, whe
need somehow to combine these two things togheter.

If you're used to Rx, you already know you can just use method chaining for
that, like in this example from [RxJS](https://github.com/Reactive-Extensions/RxJS)
docs:

```js
const input = document.querySelector('#input')
const valueOnEnter = Rx.DOM.keyup(input)
    .filter((event) => event.keyCode === 13)
    .map((event) => event.target.value)

valueOnEnter.subscribe((value) => doSomethingWithValue(value))
```

In this Rx example, we're creating a source (`Rx.DOM.keyup(textInput`) and
every time this event happens we're first mapping the event to a value (`pluck`
is probably a simpler alternative for that BTW) and then only allowing values
with more than 2 characters. Finally, the subscribe function is the "receiver"
of this signal, getting all the values that pass the 2 characters test when
they arrive.

In Act, things are a little bit different 'though. We don't use method chaing
for that. We use simple functional composition instead. The two functions to
help you do that are `pipe` and `compose`. They do the same thing, their only
difference being the order of composition. `pipe` calls functions from left to
right and `compose` from right to left.

If you're used to any Rx implementation, you'll probably prefer to use `pipe`
all the time, but if you come from the functional world, you'll probably go with
`compose`, since that's the most standard way of doing it in Haskell, and
therefore, in mathematics. In mathematics, we would say `(f ∘ g)` to express a
function that is the result of composing `f` and `g`, being them both functions.
This means that if you call the composed function with `x`, `x` will be applied
to `g` and then the result of `g(x)` to `f`, and then the resulting value will
be `f(g(x))`. In Haskell the notation is very similar:

```haskell
f = (+1)
g = (*2)
c = f . g
c(5) // => 11
```

As you can see `.` is the function composition operator. When we call the
composed function (`c`), `5` is passed to `g`, yielding 10, and then to `f`,
yielding 11.

Now back to Act. To compose the functions we created before, we could do:

```js
const valueOnEnter = pipe(onEnter, value)
```

This will, given a DOM event as source, first check if the typed character is
enter and, if it is, get the input value and send it the subscriber.

Note both `pipe` and `compose` are simply exported from [Ramda](http://ramdajs.com)
with no change whatsoever. So, if you wanna know more, just check their docs.

Now you may be wondering why not just follow Rx's lead and use method chaining.
The reasons are manifold, but let's stick to the two main ones:

  1) Using simple composition makes... uhm... composition ... simpler. Although
  composing chained calls is possible in Rx (either by wrapping it in a function
  or using `let`), it is much nicer this way. You can _always_ further compose
  your processes, like in this example:

  ```js
  const reversedValueOnEnter = pipe(valueOnEnter, reverse)
  ```

  This assumes you have a `reverse` process that maps a value to its reverse
  form (say `abc` => `cba`), and apply all processes already existing in
  `valueOnEnter` and then `reverse`, before reaching any subscriber. Pretty neat
  hum?

  2) Allows the library to be more modular. With simple composition you can
  include only the process functions you _really_ need and chop off some extra
  bytes from your final build. And this is specially relevant in the JavaScript
  world.

The final thing you need to know is that your reducer is defined as a
subscriber of all signals you define in your Act views, so no extra effort is
needed to connect your events to your reducer (to be perfectly clear, there's
an intermediate step to transform the result to a "flux standard action", a.k.a
[FSA](https://github.com/acdlite/flux-standard-action)). Also, as I already
mentioned the source is defined for you as well, which is simply the DOM element
for the event you defined.

But in case you need to do it yourself, you can check the sources available on
the signals/sources folder (or create your own, it's damn simple) and to
subscribe you just call the returned function from your process, no `subscribe`
function required. So the overall syntax of this system in sort of pseudo code
is:

```js
process(source)(subscriber)
```

Where `source` is a source (duh), and `process` is either one or a composition
of many processing functions, like the `reversedValueOnEnter` that we defined
above, and `subscriber` is a function that will do something useful with the
the processed value.

Note that unless you call the resulting process with a subscriber, absolutely
nothing will happen, not even the source will be really created (for DOM
sources it means no `addEventListener` will be attached to the DOM element),
which is probably what you expected anyway.

Now that you know the basics, you can also check the chapter about
[subscriptions](#subscriptions) to know how to handle things other than clicks
and keyboard events, things that are not automatically attached to your views,
like window events, timers, ajax calls and sockets.

Oh, and last, but not the least, now I can tell you that events with constant
values are actually also signals, using the `always` process.

## Subscriptions

Subscriptions are a way to get values feed in your application from sources
other than regular DOM node events (that you define directly in your views),
like window events, timers, ajax calls and web sockets.

They exist pretty much [the same way in Elm](http://elm-lang.org/blog/farewell-to-frp)
and they are analogous to creating any event source in [Cycle.js](http://cycle.js.org/),
just the workflow is very different.

##### React

React doesn't come out of the box with anything to handle these kind of events.
A [very] naive way to do it would be something like that:

```js
import React from 'react'
import { render } from 'react-dom'
import YourApp from '../path/to/YourApp'

renderer = () => {
  const scrollPosition = window.pageYOffset || document.body.scrollTop

  render(<YourApp scrollPosition={scrollPosition}/>, document.getElementById('root'))
}
window.addEventListener('scroll', renderer)
renderer()
```

Here's a [webpackbin](http://www.webpackbin.com/NkxDGEEHzb) for you to play around.

Of course, there are probably many libraries to solve this in a more elegant
way, one that will handle this resources and simplify the rerendering process.
If you're using Redux, you've probably heard of [redux-effects](https://github.com/redux-effects/redux-effects).

##### Act

Subscriptions are pretty simple. If you have followed the chapter on event
above you already know a bit about signals and their sources and processes. All
you have to do to create a subscription is to create those. So if we wanna
listen to the window's scroll, we should use the `fromEvent` source. Creating a
source goes like this:

```js
const source = fromEvent(window, 'scroll')
```

Note all DOM events have `start` and `stop` method, so when you pass then to your
process, you have to call `start`. It exists because for some events, Act needs to
stop the source, a DOM element that is removed from the DOM, for instance, so Act
will call the method `stop` behind the scenes.

Now, there is a built in helper for processing the scroll position, called,
conveniently, `scroll`. So you can just attach your source to it:

```js
scroll(source.start())
```

When you create subscription you don't need to call the returning function
yourself, you just pass it to Act and it will manage. The way to do that is to
pass to Act's `main` method an object with the type of the action you want to
trigger as the key. Here's the full code:

```js
const subscriptions = {
  scroll: scroll(fromEvent(window, 'scroll').start())
}

main(view, model, reducer, { subscriptions })
```

Note the subscriptions object is passed inside another object. This is because
we want to emphasize that the three first options are required for
_any_ app (to be precise, only `view` is really required but there's no sense
to use Act to just render HTML, use HTML instead!), namely `view`, `model` and
`reducer`. The fourth argument will contain things that are not used all the
time, like subscriptions, middleware, presenters, global error handlers and
others. You can learn more of those in this article.

With this code, Act will get the scroll position and send it to your reducer
with an action like `{ type: 'scroll', payload: 123 }` every time the scroll
position changes.

In real life, you'll probably only case about certain specific scroll
positions. To accomplish that you can simply put this logic in your reducer,
but the encouraged way is to further compose your scroll process:

```js
const moved = pipe(
  scroll,
  map((scrollPosition) => scrollPosition > 0)
  distinct
)
```

So in this process we first get the scroll position and turn it into a boolean,
if the user has scrolled (>0). We finally call `distinct`, else we would get
the `true` value everytime the user scrolled any pixel. `distinct` will filter
our values to send them through only when they are different than the previous
one (false becomes true and otherwise).

Another common usage here is to to throtlle (a.k.a. debouce) this event, so you
don't get too many rerenders which is memory and time consuming. In order to
emit the value only once in every second, just do:

```js
const throttledScroll = pipe(
  throttle(1000),
  scroll
)
```

The cool thing about this is that these functions can be used not only for
scroll but for any sort of subscription you need.

One final and relevant comment is that Ramda's functions are pretty handy for
creating your own processes. Take a look at some ideas:

| Ex | Transforms |
|--------|---------|
| map(head) | [1, 2, 3] => 1<br>'abc' => 'a'|
| map(tail) | [1, 2, 3] => [2, 3]<br>'abc' => 'bc'|
| map(prop('name')) | {name: 'Spinoza'} => 'Spinoza'<br />{} => undefined |
| map(propOr('Descartes', 'name')) | {name: 'Spinoza'} => 'Spinoza'<br />{} => 'Descartes' |
| filter(equals(5)) | 5 => 5<br /> 6 => ()|
| filter(propEq('id', 7)) | {id: 7} => {id: 7}<br />{id: 8} => ()|
| filter(contains(100)) | [99, 100] => [99, 100]<br /> [99, 101] => ()|
| fold(add, 0) | [1,2,3] => 6 |

###### Subscription helpers

Many use cases are too common for people to have to reinvent the wheel every time.
If you followed the examples above, take a look at the `subscriptions` folder, and
you'll find plenty of ready made helpers. Here are two of them:

```js
const subscriptions = { breakpoint, scroll }
```

The `breakpoint` subscription will give you a breakpoint for the current screen
width, every time it changes. You can provide custom breakpoint config using
`brekpointWith`. And `scroll` will give you the current scroll position, throttled to
a reasonable amount of time. To know more check the documentation on subscriptions.

Note that the examples above used the `scroll` helper from processes, so you
can compose your own, and here `scroll` comes from the subscription helpers, a
more high level library that abstracts the whole signal - source and process.

## Testing

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
  here, don't worry, it's used for many different things in the Node world. In
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

      // Verify that it's Off by default
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
