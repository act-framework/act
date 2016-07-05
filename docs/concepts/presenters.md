# Presenter

A function that sits between data and UI. Useful to perform normalizations and
filters. Presenters are not built in the `main` function, since to implement
them is pretty trivial. But we encourage you to use them whenever you have to
transform data in the UI, since doing too much data manipulation in the view
seems like an antipattern.

```js
import pipe from '@act/main/signals/pipe'

const view = (activeItems) =>
  ['ul', map((item) => (['li', item.name]), activeItems)]

const presenter = filter(propEq('deleted', false))

const model = [
  { name: 'foo', deleted: true },
  { name: 'bar', deleted: false }
]

main(pipe(presenter, view), { model })
```

Presenters can also be [memoized](/memoization.md):

```
const presenter = memoize(filter(propEq('deleted', false))
```

This way the presenter will only execute on new models. This is specially
convenient since presenters by their very nature may be slow.
