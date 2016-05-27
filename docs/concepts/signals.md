# Signals: sources & processes

For many use cases you'll want to manipulate events in order to get a
meaninful value from it. To do that you can totally just use a handler, as we
saw in [actions](/actions.md) and use imperative programming to get it done.
But there's a more elegant way out there, and you'll certainly become a better
programmer by learning it. I'll call this "signals". I'll explain you what is a
signal, without all the technical language people generally use to explain them,
but I think that if you look at an example first, you'll just understand it:

```js
import main from '@act/main'
import { valueOnEnter } from '@act/main/processes'

const view = (value) => (
  ['div', [
    value,
    ['input', {keyup: {update: valueOnEnter}}]
  ]]
)

main(view, { model: '' })
```

Looks simple, right? What this does is that is will send an action to the
reducer with type `update` and with the value of the field as the `payload`
only when the user hits enter, that's why we have this `valueOnEnter` there.

The reducer doesn't actually need to be defined, since we saw earlier that the
default reducer will override the state with the payload sent.

But sometimes the goal of an action is not to change state, but to do some side
effect. If the side effect doesn't need any info from the event, use plain
actions, like we learned in the [actions](./actions.md) chapter. But if you need,
you can use the following syntax:

```
{ event: [sideEffect, process] }
```

In this case, everey time the `event` happens, it will process it's value using
`process` and finally it will call `sideEffect` with the history and the signal
value. And if you need multiple side effects in the same event, you can always
do:

```
{ event: [[sideEffect1, process1], [sideEffect2, process2]] }
```

Actually, all allowed syntaxes eventually translate to a list of pairs
internally to Act.

If you want a quick way to know when to use each, look into the
[diagrams](../real_world/diagrams.md) doc.

Now, going back to the `valueOnEnter` thing: there are plenty of helpers like
this in Act, to cover most of the common use cases for web apps, just take a
look at the code. If what you need is not there, don't worry, you can create
your own processes.

But wait, I was talking about signals, and now I mentioned processes! The
example was simple, but what all this means? Well, a signal has two parts, a
source and a process. A source can be a DOM event handler (like in the example
above) or can be an ajax call, a timer, a websocket connection, or anything that
may give us values. And a process is just a function that gets the value that
the source produces and returns a value that matters to us. Simple enough?

In our case, the source is the click DOM event of the input. The source is
attached automatically by Act. This source give us DOM events. What the process
`valueOnEnter` does is to get this event, fetch the value (like in
`event.target.value` and only update when the `event.keyCode` is an enter key.
So, as you can see, a process can not only manipulate the original value, but
also filter it and only let us now about it when it is really important.

The cool thing about processes is that they are composable. This means you can
define them piecemeal and then group them togheter. The two most important
processes you need to know about are `map` and `filter`.

So `map` takes a value and returns another value. One example is the `value`
process:

```js
const value = map((event) => event.target.value)
```

With this you can do things like `{change: {update: value}}`, so on every input
change it will send an action with type `update` and the value of the input as
the `payload`.

And `filter` takes a value and decides whether this value is good or not. If it
is, it will pass it along the signal, else it will not:

```js
const isEnter = filter((event) => event.keyCode === 13)
```

So you can do `{keyup: {update: isEnter}`, and it will send an action if and
only if the typed character is enter (13). But notice that `filter` only
defines if the value is good, so it will pass `event` – the original value – as
the payload. Since we rarely (if ever) want to pass raw events to reducers, we
need somehow to combine these two things togheter.

If you're used to Rx, you already know you can just use method chaining for
that, like in this example from [RxJS](https://github.com/Reactive-Extensions/RxJS)
docs:

```js
const input = document.querySelector('#input')
const valueOnEnter = Rx.DOM.keyup(input)
    .filter((event) => event.keyCode === 13)
    .map((event) => event.target.value)

valueOnEnter.subscribe((value) => doSomethingWithValue(value))
```

In this Rx example, we're creating a source (`Rx.DOM.keyup(textInput`) and
every time this event happens we're first mapping the event to a value (`pluck`
is probably a simpler alternative for that BTW) and then only allowing values
with more than 2 characters. Finally, the subscribe function is the "receiver"
of this signal, getting all the values that pass the 2 characters test when
they arrive.

In Act, things are a little bit different 'though. We don't use method chaing
for that. We use simple functional composition instead. The two functions to
help you do that are `pipe` and `compose`. They do the same thing, their only
difference being the order of composition. `pipe` calls functions from left to
right and `compose` from right to left.

If you're used to any Rx implementation, you'll probably prefer to use `pipe`
all the time, but if you come from the functional world, you'll probably go with
`compose`, since that's the most standard way of doing it in Haskell, and
therefore, in mathematics. In mathematics, we would say `(f ∘ g)` to express a
function that is the result of composing `f` and `g`, being them both functions.
This means that if you call the composed function with `x`, `x` will be applied
to `g` and then the result of `g(x)` to `f`, and then the resulting value will
be `f(g(x))`. In Haskell the notation is very similar:

```haskell
f = (+1)
g = (*2)
c = f . g
c(5) // => 11
```

As you can see `.` is the function composition operator. When we call the
composed function (`c`), `5` is passed to `g`, yielding 10, and then to `f`,
yielding 11.

Now back to Act. To compose the functions we created before, we could do:

```js
const valueOnEnter = pipe(onEnter, value)
```

This will, given a DOM event as source, first check if the typed character is
enter and, if it is, get the input value and send it the subscriber.

Note both `pipe` and `compose` are simply exported from [Ramda](http://ramdajs.com)
with no change whatsoever. So, if you wanna know more, just check their docs.

Now you may be wondering why not just follow Rx's lead and use method chaining.
The reasons are manifold, but let's stick to the two main ones:

  1) Using simple composition makes... uhm... composition ... simpler. Although
  composing chained calls is possible in Rx (either by wrapping it in a function
  or using `let`), it is much nicer this way. You can _always_ further compose
  your processes, like in this example:

  ```js
  const reversedValueOnEnter = pipe(valueOnEnter, reverse)
  ```

  This assumes you have a `reverse` process that maps a value to its reverse
  form (say `abc` => `cba`), and apply all processes already existing in
  `valueOnEnter` and then `reverse`, before reaching any subscriber. Pretty neat
  hum?

  2) Allows the library to be more modular. With simple composition you can
  include only the process functions you _really_ need and chop off some extra
  bytes from your final build. And this is specially relevant in the JavaScript
  world.

The final thing you need to know is that your reducer is defined as a
subscriber of all signals you define in your Act views, so no extra effort is
needed to connect your events to your reducer (to be perfectly clear, there's
an intermediate step to transform the result to a "flux standard action", a.k.a
[FSA](https://github.com/acdlite/flux-standard-action)). Also, as I already
mentioned the source is defined for you as well, which is simply the DOM element
for the event you defined.

But in case you need to do it yourself, you can check the sources available on
the signals/sources folder (or create your own, it is damn simple) and to
subscribe you just call the returned function from your process, no `subscribe`
function required. So the overall syntax of this system in sort of pseudo code
is:

```js
process(source)(subscriber)
```

Where `source` is a source (duh), and `process` is either one or a composition
of many processing functions, like the `reversedValueOnEnter` that we defined
above, and `subscriber` is a function that will do something useful with the
the processed value.

Note that unless you call the resulting process with a subscriber, absolutely
nothing will happen, not even the source will be really created (for DOM
sources it means no `addEventListener` will be attached to the DOM element),
which is probably what you expected anyway.

Now that you know the basics, you can also check the chapter about
[subscriptions](/subscriptions.md) to know how to handle things other than clicks
and keyboard events, things that are not automatically attached to your views,
like window events, timers, ajax calls and sockets.

Oh, and last, but not the least, now I can tell you that events with constant
values are actually also signals, using the `always` process.
