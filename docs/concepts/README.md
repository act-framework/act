# Concepts

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
