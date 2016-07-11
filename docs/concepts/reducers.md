# Reducers

A reducer is a function that gets the current state and an action (an object
with the format `{ type: 'some type', payload: 'some value' }` and returns a
completely new state.

Reducers make updates predictable – since they are pure by definition –, and,
therefore reproduceable.

They have the following signature: `Model, Action -> Model`, where `Model` is
any value, and `Action` is `object { type: string, payload: any, * }`. This
means the action object must have at least the `type` and `payload` keys, but
can have any other key you want.

Example:

```js
const calculatorReducer = (state, { type, payload }) {
  switch (type) {
    case 'add':
      return state + payload
    case 'subtract':
      return state - payload
    case 'multiply':
      return state * payload
    case 'divide':
      return state / payload
    default:
      return state
  }
}
```

#### More idiomatic reducers

Many people are put off for the usage of `switch`. Although this is an
aesthetic judgement and there's nothing intrinsically wrong with it, there
are more idiomatic ways to write reducers.

First of all a switch statement is the poor cousins of [pattern matching and
guards](http://learnyouahaskell.com/syntax-in-functions). Take a look:

```haskell
calculatorReducer "add"      state payload = state + payload
calculatorReducer "subtract" state payload = state - payload
calculatorReducer "multiply" state payload = state * payload
calculatorReducer "divide"   state payload = state / payload
calculatorReducer _          state _       = state

-- or
calculatorReducer type state payload
  | eq "add"      = state + payload
  | eq "subtract" = state + payload
  ...
  where eq = (===) type
```

This would be the equivalent of our previous example in Haskell. Of course, we
can improve this my using Haskell's features, specially, I would say, proper
types instead of strings for the action types (now you probably have a better
clue why it is called "type" in JS :D), but the good news it that there is an
interesting function in Ramda to get us a little closer to that, namely,
`cond`.

Here's the gist of `cond`:

```js
const fn = cond([
  [equals(0),   always('water freezes at 0°C')],
  [equals(100), always('water boils at 100°C')],
  [T,           (temp) => `nothing special happens at ${temp}°C`]
])
fn(0) //=> 'water freezes at 0°C'
fn(50) //=> 'nothing special happens at 50°C'
fn(100) //=> 'water boils at 100°C'
```

So if the value passed to the function matches 0, it runs the first function
and so on, until getting to final condition `T`, which is basically the "true
function", i.e a function that always returns true (like in `() => true`), so
it always matches any unmatched value, working pretty much as Haskell's
`otherwise` or JS's `default`.

So one more idiomatic - in the functional context – way of building a reducer,
would be to resort to this helper:

```js
const typeHandlers = cond([
  [equals("add"),      (type, state, payload) => state + payload],
  [equals("subtract"), (type, state, payload) => state - payload],
  [equals("multiply"), (type, state, payload) => state * payload],
  [equals("divide"),   (type, state, payload) => state / payload],
  [T,                  (type, state, payload) => state]
])

const calculatorReducer = (state, { type, payload }) =>
  typeHandlers(type, state, payload)
```

Although this is more composable than a switch, since you can add items to the
list dynamically, and more idiomatic functionally speaking, it seems still too
verbose and not really idiomatic in a JavaScript context (which I guess it's a
hard to define thing to do... probably idiomatic JavaScript is either jQuery or
injecting logic as tag's attributes :D).

So by looking at `cond` and the specific use of it in reducers, it seems it's
always the case we wanna use `equals` in the condition (except for T), and
always a function with the reducer arguments as the 2nd parameter. Therefore,
it is natural to assume we could end up with a configuration like this:

```js
{
  add: (state, payload) => state + payload,
  subtract: (state, payload) => state - payload,
  ...
}
```

We could also remove the `action` being passed to the function (something that
`cond` would always do) by wrapping it, and have the T condition as a default.

This is what you'll find in the `guard` helper. It is a little
syntactic sugar over Ramda's `cond`. Here's the full example:

```js
const calculatorReducer = guard({
  add: (state, payload) => state + payload,
  subtract: (state, payload) => state - payload,
  multiply: (state, payload) => state * payload,
  divide: (state, payload) => state / payload
})
```

Mutch more brief.

You will find something very similar in the Redux world in redux-actions's
[handleActions](https://github.com/acdlite/redux-actions#handleactionsreducermap-defaultstate).

But still, if we look into Ramda's utilities we will find
functions with exactly the same signatures we need here, namely `Number → Number
→ Number` (gets two numbers, returns a number). As examples,
[`add`](http://ramdajs.com/0.21.0/docs/#add),
[`subtract`](http://ramdajs.com/0.21.0/docs/#subtract),
[`multiply`](http://ramdajs.com/0.21.0/docs/#multiply) and
[`divide`](http://ramdajs.com/0.21.0/docs/#divide).

Therefore, we can do:

```js
const calculatorReducer = guard({
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide
})
```

And finally, this is the same as:

```js
const calculatorReducer = guard({ add, subtract, multiply, divide })
```

As a final note, you may be wondering what are the advantages of implementing
this on top of `cond`, instead of a more "traditional" (in the JS world) way,
like other libraries do. Apart from the fact it follows the general Act way of
building things it gives you some nice alternatives. For instance, if you may need
a more tricky condition, you can still do that, using arrays instead of an object:

```js
const load = equals('load')
const unload = complement(load)
const loading = set(lensProp('loading'))

const reducer = guard([
  [load, loading(true)],
  [unload, loading(false)] // runs for all actions except `'load'`
])
```

And as you can see, using Ramda's lens make it all so much nicer.
