# Lens

This is an example of using `lens`. If you're used to Redux's `connect`, it
solves the same problem. Since side effect functions don't need to be connected
to any special dispatch `lens` only solves the problem of getting filtered
data to a specific part of your views when your data is too nested.

Ideally, you should solve this problem using
[presenters](http://lulk.in/act/docs/concepts/presenters.html). But there are
some use cases where `lens` will be simpler, specially if you just don't need
to manipulate the data in your presenters, or you need to go up in the data tree
in a specific view. Also, you can use Ramda's lens functions inside your
presenter.

Let's see two examples of `connect`:

```
const ConnectedAddress = connect((state) => (state.user.address))(Address)
const ConnectedPurchase = connect((state) => (state.purchases[0]))(LatestPurchase)

```

Now using `lens`:

```
const connectedAddress = lens(['user', 'address'], address)
const connectedPurchase = lens(['purchases', 0], latestPurchase)
```

Note in `connect` you have to make 2 function calls, which makes the code a
little bit more verbose, but in `lens` you don't, since it's curried.

Another thing you may wanna do, if you wanna filter _and_ manipulate the data
is to directly use some Ramda's functions, like
[`lensPath`](http://ramdajs.com/0.21.0/docs/#lensPath) and
[`over`](http://ramdajs.com/0.21.0/docs/#over) or maybe simply
[`evolve`](http://ramdajs.com/0.21.0/docs/#evolve).
