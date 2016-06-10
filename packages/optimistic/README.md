<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />
  A simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a>
  &nbsp; <a href="http://npmjs.com/package/@act/optimistic"><img src="https://img.shields.io/npm/v/@act/optimistic.svg?maxAge=2592000" /></a>

</p>
<br />

## Act optimistic updates

Act optimistic updates hello world:

```js
import main from '@act/optimistic'
import map from 'ramda/src/map'
import valueOnEnter from '@act/main/processes/valueOnEnter'

const add = (payload, history) =>
  history.push({ type: 'success', payload }, (rollback) =>
    setTimeout(rollback, 5000))

const view = (comments) =>
  ['main', [
    ['input', { keyup: [add, valueOnEnter], value: '' }],
    ...map((comment) => ['div', comment], comments)
  ]]

const reducer = (state = [], { type, payload }) =>
  type === 'success' ? [...state, payload] : state

main(view, { reducer })
```

## More

The documentation for this module is part of [Act's](https://github.com/joaomilho/act)
docs.
