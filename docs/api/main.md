# main

The `main` function is the most important function in Act, since it bootstraps
your whole app.

### Params

|param|type|description|
|---|---|---|
|view|string, json or function|the representation of your dom in json|
|params|undefined or object|an object possibly containing the following items|
|params.model|any|the initial model of your app|
|params.node|HTMLElement|an HTML element to render your app, else document.body|
|params.reducer|function|a function mapping actions to state|
|params.storage|object|an object with `get` and `set` to remember your state|
|params.subscriptions|object|an object with subscription functions|
|params.historyClass|object|a history object|

### import

```js
import main from '@act/main'
```

#### view

```js
// string
main('Hello!')

// json
main(['h1', 'Hello!'])

// function
main(() => ['h1', 'Hello!'])
```

If `string` is passed, it will be wrapped in a `span` tag.

Your view can break down into other functions or constants:

```js
const view = (content) =>
  ['main', [header, body(content), footer]]

const header =
  ['header', 'MyApp']

const body = (content) =>
  ['article', content]

const footer =
  ['footer', 'All rights reserved']

main(view, { model: 'Here is the content' })
```

#### params.model

The `model` represents your initial application data, before any transformation
happens. It is optional since your app may not need any data or it may define it
based on reducers [see below].

```js
import map from 'ramda/src/map'

const view = (model) =>
  ['main', [
  	['h1', model.title],
  	['ul', map(todo, model.todos)]
  ]]

const todo = (task) =>
  ['li', `[${task.status}] ${task.description}`]

const model = {
  title: 'Welcome to the todo app',
  todos: [
    { status: 'DONE', description: 'Write docs for params.model' },
    { status: 'REJECTED', description: 'Make sure it works on IE6' }
  ]
}

main(view, { model })
```

#### params.node

A reference to the DOM node where you want your app to be rendered.

```js
main('Hello!', { node: document.getElementById('app') })
```

#### params.storage

An object with a `get` and a `set` functions. The `get` function will be called
in the first render, and `set` will be called every time your state changes,
receiving the state.

There can be only one storage.

```js
import storage from '@act/main/storages/localStorage'

const view = (count) =>
  ['button', { click: { add: 1 } }, count]

const reducer = (state = 0, {type, payload}) => {
  switch (type) {
	case 'add':
	  return state + payload
	default:
	  return state
  }
}

main(view, { reducer, storage })
```

In the above example, the initial count will be fetched from the storage, else
it will be `0`. Every time the state changes – when the user clicks the button –,
the storage will be updated.

#### params.subscriptions

An object where keys are the types of actions to be emitted and values are a
subscription function. Check more about subscriptions in the concepts docs.

```js
import breakpoint from '@act/main/subscriptions/breakpoint'

const view = (breakpoint) =>
  ['div', `Current breakpoint is: ${breakpoint}`]

const subscriptions = {
  breakpoint: breakpoint
}

main(view, { subscriptions })
```

In the above example, every time the current breakpoint changes, the reducer
will receive an action with type `breakpoint` and the payload will be the
current breakpoint (like `small`, `medium`...).

Since this app doesn't define a reducer, the model will always be updated with
the payload, therefore it will always contain only the current breakpoint.

#### params.historyClass

Read more on [history docs](../concepts/history.md).
