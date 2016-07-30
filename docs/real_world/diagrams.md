# Diagrams

### What kind of event should I use?

<table>
  <tr>
  	<th></th>
  	<th>simply updates data</th>
  	<th>side effect <small>(may update data)</small></th>
  </tr>
  <tr>
  	<th>interaction on element inside view</th>
  	<td>action</td>
  	<td>action with side effect</td>
  </tr>
  <tr>
  	<th>user interacts with element outside views</th>
  	<td rowspan="2">subscription</td>
  	<td rowspan="2">subscription with side effect</td>
  </tr>
  <tr>
  	<th>from an outside source (timer, socket...)</th>
  </tr>
</table>

#### Explanation

#### Actions

###### action

A signal you attach to a DOM node, that will automatically emit an action based on the signal value. Ex:

```
['input', { keyup: ['setName', valueOnEnter] }]
```

Will emit `{ type: 'setName', payload: 'Value when user press ENTER' }`.

The value can also be constant:

```
['button', { click: ['add', 1] }]
```

The code above is the same as `['add', always(1)]`, so allowing the simpler syntax is just sugar.

###### action with side effect

Similar with the examples above, but here you don't want the event to automatically update your data.

```
['input', { keyup: [sideEffect, valueOnEnter] }]
```

So on every enter, the value will be sent to a user defined `sideEffect` function. This function receives the `history` object, so it can still change the data, if necessary, using the `push` method.

If you don't need any process over the event data, you can simply do:

```
['button', { click: sideEffect }]
```

So on every click, the original event will be sent to a user defined `sideEffect` function. This function also receives the `history` object.

Note this is the same as `{ click: [sideEffect, identity] }`, so the shorter syntax is also just sugar.


#### Subscriptions

###### subscription

A signal you attach to something other than a DOM node, like the window, an animation frame event, a socket..., that will automatically emit an action based on the signal value. Ex:

```
subscriptions = [
  ['scrolled', scroll]
]
```

Will emit `{ type: 'scrolled', payload: 123 }` when the user scrolled to this point.

###### subscription with side effect

Similar with the examples above, but here you don't want the subscription to automatically update your data.

```
subscriptions = [
  [sideEffect, scroll]
]
```

So on every scroll, the value will be sent to a user defined `sideEffect` function. This function receives the `history` object.
