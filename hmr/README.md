<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />
  A simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a>
  &nbsp; <a href="http://npmjs.com/package/@act/hmr"><img src="https://img.shields.io/npm/v/@act/hmr.svg?maxAge=2592000" /></a>

</p>
<br />

## Act hot module replacement [hmr]

Act hmr hello world:

```js
import main from '@act/hmr'

const view = (val) =>
  ['button', { click: { add: 1 } }, val]

const reducer = (state, { type, payload }) =>
  type === 'add' ? state + payload : state

main(view, { reducer, module })
```

Full [kanban board example](https://github.com/joaomilho/act/blob/master/hmr/examples).

## More

The documentation for this module is part of [Act's](https://github.com/joaomilho/act)
docs.
