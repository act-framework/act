<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />
  A simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a>
  &nbsp; <a href="http://npmjs.com/package/@act/animation"><img src="https://img.shields.io/npm/v/@act/animation.svg?maxAge=2592000" /></a>

</p>
<br />

## Act animation

Act animation hello world:

```js
import main, { spring } from '@act/animation'

const view = (val) =>
  ['.redBox', { style: { left: val * 400 } }]

main(view, { subscriptions: { spring } })
```

Example with [manageable history](./examples/):

![Example](https://s3.amazonaws.com/f.cl.ly/items/1T073x2r410f47322X3l/act-animation.gif?v=594c65f6)

## More

The documentation for this module is part of [Act's](https://github.com/joaomilho/act)
docs.
