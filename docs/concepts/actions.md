# Actions

In Act events are not dealt like in plain HTML. This may sound bad for who is
starting, but it comes with nice perks. The way Act deals with events is closer
to Redux's way, but with some more details.

To simplify let's start with something that resembles Redux. We'll call this
events that dispatch an action.

The syntax is `{event: handler}`, where `event` is any DOM event like `click`,
`keyup`, `keydown`, `change`, and so on, and `handler` a function that you'll
define. `handler` will receive both the event object (so you can do things like
`preventDefault`, `stopPropagation`, get key codes or values from the target
DOM element) and an `update` function. You can think of this function as the
`dispatch` in Redux, or some sort of `setState` on steroids :D.

```js
const handler (history, event) =>
  history.push('someAction', 'somePayload')

const button = () => ['button', {click: handler}]
```

That's the general syntax. `history.push` will send this to your reducer and
your app will rerender. To find out more about `history` check [its docs](/history.md).
Since this example is a little too simple, let's see a better one:

```js
import main from '@act/main'

const add (history, event) =>
  history.push('add', 1)

const view = (model) => ['button', {click: add}, model]

const reducer = (state = 0, {type, payload}) =>
  type === 'add' ? state + payload : state

main(view, { reducer })
```

That's the whole app. When you click in the button, it calls add, that calls
`history.push`, that calls the reducer that will rerender your whole app (yeah,
ok, just a button with a number).

###### Events with constant values

Now let's make it even simpler. Since most of the time you want to emit a
simple value from your events, like in the example above, you can reduce it to:

```js
import main from '@act/main'

const view = (model) => ['button', {click: {add: 1}}, model]

const reducer = (state = 0, {type, payload}) =>
  type === 'add' ? state + payload : state

main(view, { reducer })
```

So we removed the handler and changed the syntax to be `{click: {add: 1}}`.
Again, `click` is any DOM event, but here `add` will be the `type` and `1` the
payload sent to the reducer when the event happens.

By now it seems this is just a simplified version of the above, and in practice
it is. But you'll learn in the next section that this builds a signal. We'll
look into signals in the next section, but I want to show you an even simpler
version of that below, that will not require us to define any reducer:

```js
import main from '@act/main'
import { count } from '@act/main/processes'

const view = (model) => ['button', {click: {add: count}}, model]

main(view, { model: 0 })
```

This works, first of all, because if you don't pass any reducer to `main`, it
will use a default reducer that always override the state with any action
payload sent. And second, because `count` is a process that uses `fold` behinds
the scene to accumulate. But I guess we dug too deep. Now go to the
[signals](/signals.md) and this will be clearer.


