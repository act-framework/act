# History

In Act, the history object centralizes all UI updates. It receives all new
actions, calculates the new state and manages rerendering the application.

The most important method to know is `push`. It correlates with `dispatch`
in Redux.

One interesting thing is that you can create your own history object and
override the default one in your application. Although this use case is rare,
it may be highly relevant. One example of overriding history is the `animation`
module. It overrides the basic history by not buffering updates, since the
basic one will buffer pushes if they happen too fast (~16ms), in order to
improve performance for things like integration tests.

But you don't really need to know about this details. Each module that needs to
implement it's own history will expose a new `main` function for you, injecting
it's history there.

Here's a list of features of histories used in basic Act modules, if you're
interested:

- History: The basic history. It's focused on performance optimizations. It
  buffers updates that happen too fast and run them asynchronously. It also
  doesn't keep previous actions, so it doesn't consume much memory.

- TraversableHistory: This history keeps track of present, past and future,
  adding methods like `go`, `undo` & `redo`.

- AnimationHistory: Skips buffering to allow animations.

- TraversableAnimationHistory: Both skips buffering and gives traversing
  methods.
