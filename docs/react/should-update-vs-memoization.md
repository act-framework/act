# shouldComponentUpdate vs memoization

##### React

React comes with a handy method to prevent unnecessary rerenders of components:
`shouldComponentUpdate`. Simply put, this method will receive the new
properties and state of the component, and you compare 'em somehow with the
current ones, returning `false` if you want to avoid a rerender.

Here's a dummy example:

```
class Hello extends React.Component  {
  shouldComponentUpdate (nextProps) {
    return this.props.name !== nextProps.name
  }

  render () {
    return <h1>Hello {this.props.name}!</h1>
  }
}
```

At the time I'm writing this, unfortunatelly `componenShouldUpdate` can only be
used on components defined as classes and not functions.

##### Act

Act doesn't dictate how you should avoid rerenders. Nevertheless, it encourages
the usage of memoization. So start by reading about memoization [here](../concepts/memoization.md).

Now that you understand what memoization is all about you probably already has
an idea on how it differs from `shouldComponentUpdate`.

Memoization is, generally speaking, more costly than a simple implementation of
`shouldComponentUpdate`, but on the upside, it doesn't care only about the
difference between the current and new values, it will avoid rerenders for
_any_ value that has already been received in the past. This may seem not so
relevant for a vast number of use cases, but it is specially relevant for
another vast amount as well. For instance, if you're building a game, even a
simple one, you'll realize parts of it (or even all of it!) have constantly
repeating patterns.

Another difference is that in React you have to implement your comparison based
both on state and props, while in Act there's no concept of internal state to a
component (did I already mentioned there's no clear concept of component?).
That said, if memoization is too costly for you, an you wanna implement a lite
version of it, say, only by comparing object id props in a list, go ahead.
