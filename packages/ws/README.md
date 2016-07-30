<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />
  A simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a>
  &nbsp; <a href="http://npmjs.com/package/@act/ws"><img src="https://img.shields.io/npm/v/@act/ws.svg?maxAge=2592000" /></a>

</p>
<br />

## Act ws

Act ws hello world:

```js
import main from '@act/main'
import fromSocket from '@act/ws/fromSocket'

const socket = fromSocket('ws://socket-server.com')

const view = (model) =>
  ['main', [
  	['button', { click: socket.emit('ping') }, 'Ping']
  	model
  ]]

const subscriptions = { pong: socket.on('pong') }

main(view, { model: 'No pong yet', subscriptions })
```

## More

The documentation for this module is part of [Act's](https://github.com/joaomilho/act)
docs.
