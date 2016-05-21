# Unidirectional data flow

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
