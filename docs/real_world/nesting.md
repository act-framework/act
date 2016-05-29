# Nesting

Act encourages you to build simple apps, but having to reuse parts of your app
will be very common. For this, one of the techniques you can use is nesting. If
you read the Elm architecture documentation you already have a good idea of
what I am talking about.

Let's go over a multi-counter example. First, let's implement the counter:

```
// counter.js
const view = (count) =>
  ['.counter', [
    ['h1', count],
    ['button', {click: {add: 1}}, 'Add 1'],
    ['button', {click: {add: -1}}, 'Remove 1']
  ]]

export const model = 0

export const reducer = (state, {type, payload}) =>
  type === 'add' ? state + payload : state

export default { view, model, reducer }
```

Note the only difference here from a counter app is that you don't need to
import and use `main`. You simply export the relevant parts of a counter,
namely `view`, `model` and `reducer`.

If you wanted to just render this counter, it would be as easy as:

```
import counter from './counter'
import main from '@act/main'

const { view, model, reducer } = counter
main(view, { model, reducer })
```

But we want to nest two counters togheter. To accomplish this, we'll import the
`nest` helpers:

```
// twoCounters.js
import counter from './counter'
import nest from '@act/main/nest'

const view = ({top, bottom}) => (
  ['main', [
    nest.view('top', counter.view(top)),
    nest.view('bottom', counter.view(bottom))
  ]]
)

const reducer = nest.reducers({
  top: counter.reducer,
  bottom: counter.reducer
})

const model = {
  top: counter.model,
  bottom: counter.model
}

export default { view, model, reducer }
```

As you can see, `nest` give us two methods. The first, `nest.view` receives a
strong and a view JSON. What it does is that it renders the view, changing all
events to prefix the given string in the type of it's actions. Yes, it's a bit
magical. This means that the `{click: {add: 1}}` will be transformed to
`{click: {'top.add': 1}}` and `{click: {'bottom.add': 1}}`. This is because we
need a way to differentiate events that happen in different elements. You could
simply change your reducers to account for this new action type. But before you
do that, let's see the second helper.

The second helper, `nest.reducers`, as expected will create a new reducer the
accounts for the new action types injected in the views.

So if the counter reducer is...

```
export const reducer = (state, {type, payload}) =>
  type === 'add' ? state + payload : state
```

... when we do ...

```
const reducer = nest.reducers({
  top: counter.reducer,
  bottom: counter.reducer
})
```

...we will end up with something like this:

```
export const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'top.add':
      return { ...state, top: state + payload }
    case 'bottom.add':
      return { ...state, bottom: state + payload }
    default:
      return state
  }
}
```

Pretty rad, hum? But  you probably noticed we're still exporting the nested
counters. That's because nesting is recursive, supporting any level of nesting.
So let's nest our counters one more time.

```
import twoCounters from './twoCounters'
import main from '@act/main'
import nest from '@act/main/nest'

const view = ({left, right}) => (
  ['main', [
    ['.left', {style: 'float: left'}, [
      nest.view('left', twoCounters.view(left))
    ]],
    ['.right', {style: 'float: right'}, [
      nest.view('right', twoCounters.view(right))
    ]]
  ]]
)

const reducer = nest.reducers({
  left: twoCounters.reducer,
  right: twoCounters.reducer
})

const model = {
  left: twoCounters.model,
  right: twoCounters.model
}

main(view, model, reducer)
```

Now our model will be a deeply nested object:

```
{
  left: {
    top: 0,
    bottom: 0
  },
  right: {
    top: 0,
    bottom: 0
  }
}
```

Our views will emit actions with types like `left.top.add` and
`right.bottom.add`, and our reducer will handle them nicely.

Notice most of the time you'll have more data than just a nested group of
components. You have two options to deal with that. First, you can always just
use the nested reducer as part of another reducer:

```
const countersReducer = nest.reducers({
  left: twoCounters.reducer,
  right: twoCounters.reducer
})

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'someOtherAction:
      ...
    default:
      return countersReducer(state, { type, payload })
  }
}
```

The other alternative is to use `combine`, to combine reducers. This method is
analogous to Redux's `combineReducers`.
