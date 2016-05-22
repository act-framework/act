# Memoization

Act doesn't dictate how you should avoid rerenders. Nevertheless, it encourages
the usage os memoization. If you're used to React's `componentShouldUpdate`,
you may read the comparison [here](../react/component-should-update-vs-memoize.md).

Memoization is an age old technique - specially in functional programming - to
cache [pure](https://en.wikipedia.org/wiki/Pure_function) functions. Basically
it wraps a given function and stores all given inputs and outputs. If some newly
passed inputs match some stored inputs it simply returns the stored value,
without calling the original function.

This technique is not a panacea, and will only help your performance if the
cost of storing and searching elements in a hash tabe is better than the actual
amount of time your function takes to execute. And this is specially
problematic in JavaScript, given the difficulty of comparing deeply nested
data. There's no simple rule of thumb to know when to use it, so I encourage
you to use `benchmark` and see for yourself.

I've done some benchmarks in my machine (a MacBook, 2.6 GHz Intel
Core i5, with 8 GB of RAM) and apparently memoize starts being useful when a
function doesn't do more than 1.5M operations per second. But again, this is a
dummy rule, since its usefuless may depend on much more things, like the
function's complexity.

Here's a naive implementation and usage example of memoize:

```
const memoize = (fn) => {
  const cache = []

  return (...args) => {
    const cachedReturn = cache[JSON.stringify(args)]
    if (cachedReturn) return cachedReturn

    return cache[JSON.stringify(args)] = fn(...args)
  }
}

const sum = (x, y) => {
  console.log(`called with x=${x} y=${y}`)
  return x + y
}

const memoizedSum = memoize(sum)

memoizedSum(1, 1) // called with x=1 y=1 => 2
memoizedSum(1, 1) // => 2
memoizedSum(2, 1) // called with x=2 y=1 => 3
memoizedSum(2, 1) // => 3
```

Luckily there's a not-so-naive implementation of memoize on Ramda library. So
you can simply:

```
import memoize from 'ramda/src/memoize'

const memoizedFn = memoize(fn)
```

Since Act's views are simply JSON – even if it contains some functions there
shouldn't be any cyclic object value on them –, Ramda's memoize is supposed to
work fine. All you have to do is:

```
// before
const view = (model) => (
  ['div', someOp(model)]
)

// after
const view = memoize((model) => (
  ['div', someOp(model)]
))
```

This, of course, assuming the `view` function is pure – so therefore `someOp`
must also be pure.

A final note is that memoization can be used for _any_ pure function, so you can
use it not only for views, but also for processes (again, if pure) and other
interesting things.
