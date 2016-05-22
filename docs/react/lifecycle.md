# Lifecycle events

##### React

React comes with plenty of [lifecycle events](https://facebook.github.io/react/docs/component-specs.html)
for individual components, like `componentDidMount`, `componentWillUpdate`,
`shouldComponentUpdate` and so on. These are useful for a number of things,
like triggering some ajax call before the component renders
(`componentWillMount`), avoiding unnecessary rerenders
(`shouldComponentUpdate`), run certain operations when a component is about to
be updated `componentWillUpdate` and clear any listener, like a `setTimeout`
when a component gets out of the DOM (`componentWillUnmount`).

##### Act

Act doesn't come with any built in lifecycle events. But don't panic! What you
have to understand is that Act doesn't really have a clear concept of
"component". Act has view functions (or even constants) that will, in the end
be aggregated by a single view function that returns your whole DOM
representation as JSON. But this doesn't mean you simply can't achieve the same
results as in most React lifecycle events.

First of all, all event listeners will be stopped when a tag gets out of the
DOM automatically (ok, sure, event listeners will also be killed automatically
in React).

Second, if you're looking to avoid rendering, take a look at
[memoization](../concepts/memoization.md), it's sort of a
`shouldComponentUpdate` on steroids. Check also the [differences](./component-should-update-vs-memoization)
between it and `shouldComponentUpdate`. You can also take a look at
virtual-dom's concept of [thunk](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/thunk.md).

Third, if you wanna have a mount hook on a specific tag (not a function!), since
Act uses virtual-dom behind the scenes, you can still use the [hook
mechanism](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md)
that exists there (if you're really interested, look into Act's hooks on
eventHandler.js and signalHook.js).

Finally, remember you're simply dealing with functions, and they come with all
sorts of natural ways to do things. For instance, if you memoize a view, it
will run only if the inputs changed, therefore if you execute some routine in
this function before returing it's JSON, you can be assured this routing will
only be executed when the function gets new values. Be creative.

