# Concepts

## Using JSON for rendering

In Act, all views are defined in a JSON format. This is the syntax for a tag:

```js
[tagName, attributes, children]
```

Here, `tagName` is any HTML tag name, like `h1` or `div`. `attributes` is an
object with all tag's attributes, like `type` or `checked`. Finally, `children`
may be an array or a single item, like a string or a number.

Both `attributes` and `children` are optional, so, if you don't define any
attribute, the children will go on the second index of the array:

```js
[tagName, children]
```

You can also use virtual-dom's special syntax for classes and ids:

```js
['h1.title', ...]
['#menu', ...]
```

One of the advantages of this approach is testing your components, since if you
just wanna check that they return the right thing you don't need any special
rendering library or function.

## Unidirectional data flow

Act follows the "unidirectional data flow" way of passing data to views, like
in [Flux](https://facebook.github.io/flux/) – and pretty much any other
reactive front-end framework.

This means there's no way to pass data from a view to another except by
triggering an action that will change your model and then rerender the whole
app. Also, no "two-way data binging".

One very important thing is that there's also no way to have something like
React's "stateful components", 'cause there's no `setState` for a single
component. Act's analogous for `setState` (`update`) will always pass the
resulting state to the main view and, therefore, rerender everything.

## Single model & reducer

In Act you have a single data model and a single reducer. A data model is a
plain JavaScript value (object, array, string, number...).

When you nest components you can treat their individual models and reducers as
isolated, but the main component in your app will have to compose them to
create a single data object and a single reducer.

To understand it better I suggest reading Redux's
[three principles](http://redux.js.org/docs/introduction/ThreePrinciples.html),
since everything is stated there is also true for Act.

## Reducers

A reducer is a function that gets the current state and an action (an object
with the format `{ type: 'some type', payload: 'some value' }` and returns a
completely new state.

Reducers make updates predictable – since they are pure by definition –, and,
therefore reproduceable.

## Signals: sources & processes

#TBD

## Subscriptions

#TBD

## Storage

#TBD
