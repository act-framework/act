# Reselect vs Ramda

##### React

In order to generate filters and aggregates for your data, the most used tool
in Reac't world is [reselect](https://github.com/reactjs/reselect).

Here's an example:

```
const shopItemsSelector = state => state.shop.items

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)
```

##### Act

As stated in our goals, Act is heavily dependant on Ramda. In my POV, there
are too many bad implementations of Haskell's prelude in JavaScript, and
reselect, althought not such a bad implementation, only repeats simple things
to do with a proper Prelude (like Ramda) but with novel names. Here's Ramda
version of the code above:

```
const shopItemsSelector = state => state.shop.items

const subtotalSelector = pipe(
  shopItemsSelector,
  reduce((acc, item) => acc + item.value, 0)
)
```

Even simpler, and with tools that will be useful for so much more!
