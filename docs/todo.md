##### Error handling & debugging

- Improve errors on renders and global error handler.

- Make sure all internal methods respond to `.name`. I don't know how.

##### Performance

- Instead of doing JSON => VDOM and then a VDOM DIFF, do JSON => VDOM DIFF, since it would be faster.

##### Examples

- Add example of "eval" of components: getting JSON components from server. Think about how this can be safe enough.

- Add example of mouse events.

- Implement an example with hot module replacement.

##### Reducers

- The idea of buildReducer may not be that bad:
Instead of `switch (type) {  case 'foo', case 'bar', case 'baz' ... }`, do `buildReducer(foo, bar, baz)`, where foo bar and baz handle only the specific action.

##### Subscriptions

- A way to start/stop subscriptions only when a certain component is mounted/unmounted. How?

- May need more than one signal for the same action key. Should it be solved by always merging it or allowing a list, like in:

```
subscriptions = {
  foo: [signalA, signalB]
}

// or

subscriptions = {
  foo: merge(signalA, signalB)
}

```

##### Breakpoints

- Breakpoints [using](https://www.smashingmagazine.com/2013/03/logical-breakpoints-responsive-design/) [em](https://github.com/tysonmatanich/getEmPixels/blob/master/getEmPixels.js)?

##### Events

- Also pass the state to the event handlers.

##### Middleware

- Implement middlewares.

- Allow update to get more info, like meta stuff: `update(type, payload, { arbitraryObject })`. Usefull for middleware.

##### Presenter

- A presenter is something that doesn't care about actions or the history. They
  just sit between the result of reducers (the calculated current state) and
  the view layer. It may be useful to transform the raw data for presentational
  purposes only (like filtering or rearanging object formats). The
  implementation would be simply something like:
  `view(presenter(currentState)). Since it only serves view purposes, it
  shouldn't affect things like storages.
