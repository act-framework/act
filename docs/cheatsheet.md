# Cheatsheet

You can also download a [PDF cheat sheet](http://act-framework.github.io/act/docs/cheatsheet.pdf).

#### main

Render text

```js
main('Hello')
```

Render tag

```js
main(['h1', 'Hello'])
```

Render function

```js
const view = () => ['h1', 'Hello']

main(view)
```

Render function with model

```js
const view = (val) => ['em', val]
const model = 10

main(view, { model })
```

With reducer

```js
const reducer = (state = 0, {type, payload}) => {
  switch(type) {
    case 'em'
      return state + 1
    default:
      return state
  }
}

main(view, { reducer })
```

With subscriptions

```js
const subscriptions = {
  scroll
}

main(view, { subscriptions }
```

Render on a specific DOM node

```js
const node = document.getElementById('app')

main(view, { node })
```

With different history

```js
main(view, { historyClass: TraversableHistory })
```

#### views

Simple tag

```js
['h1']
```

Tag with id

```js
['h1#title']
['h1', {id: 'title'}]
```

Tag with class

```js
['div.main']
['div', {class: 'main'}]
```

Tag with attributes

```js
['input', {type: 'checkbox', checked: true}]
```

Tag with styles

```js
['i', {style: 'color: red; margin: 5px'}]
['i', {style: {color: 'red', margin: 5}}]
```

Tag with css modules (constant)

```js
['i', {style: [styles.main, style.selected]}]
// or
['i', {style: [styles, 'main', 'selected']}]
```

Tag with css modules (conditional)

```js
['i', {style: [styles, [open, 'is_open']]}]
['i', {
  style: [styles, [open, 'is_open', 'is_closed']]
}]
```

Tag with text child

```js
['h1', 'Hello']
['em', 12]
```

Tag with child

```js
['main', ['h1', 'Hello']]
```

Tag with children

```js
['main', [
  'Hello',
  ['br'],
  'World'
]]
```

#### actions

Emit action with type and no payload

```js
['button', {click: 'add'}]
```

Emit action with type and constant payload

```js
['button', {click: {add: 1}}]
```

Emit action with type and signal value payload

```js
['input', {keyup: {update: valueOnEnter}}]
```

Emit multiple actions with type and signal value
payloads

```js
['input', {keyup: {
  update: valueOnEnter,
  clear: valueOnEsc,
}}]
```

Execute side effect with original value

```js
['input', {change: sideEffect}]
```

Execute side effect with signal value

```js
['input', {change: [sideEffect, value]}]
```

Execute multiple side effects with signal value

```js
['input', {change: [
  [sideEffect1, value],
  [sideEffect2, onKeyCode(33)]
]}]
```

Mixing all of the above

```js
['input', {change: [
  ['event', identity],
  ['add', always(1)],
  ['update', valueOnEnter],
  [sideEffect, onKeyCode(66)]
]}]
```

Side effect function

```js
const sideEffect = (payload, history) {
  const result = doSomeSideEffect(payload)
  history.push({
    type: 'side_effect',
    payload: result
  })
}
```

#### subscriptions

Subscriptions emiting action from signal

```js
const subscriptions = {
  actionType: signal
}
const subscriptions = {
  scroll
}
```

Subscription calling side effect from signal

```js
const subscriptions = [
  [sideEffect, signal]
]
```
