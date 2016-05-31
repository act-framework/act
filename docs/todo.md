##### Docs

- Improve docs everywhere: getting started, concepts, API...

##### Error handling & debugging

- Improve errors on renders and global error handler.

- Make sure all internal methods respond to `.name`. I don't know how.

##### Performance

- Instead of doing JSON => VDOM and then a VDOM DIFF, do JSON => VDOM DIFF, since it would be faster.

##### Examples

- Add example of "eval" of components: getting JSON components from server. Think about how this can be safe enough.

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

##### Middleware

- Implement middlewares.

- Allow update to get more info, like meta stuff: `update(type, payload, { arbitraryObject })`. Usefull for middleware.

##### Optimistic

- Add example for optimistic updates. May require a new History.