<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />	
  The simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a> 
  &nbsp; <a href="http://npmjs.com/package/@act/main"><img src="https://img.shields.io/npm/v/@act/main.svg?maxAge=2592000" /></a>
  
</p>
<br />

## Hello Act

Here's Act's hello world:

```js
main('Hello world')
```

And here's the classic counter example:

```js
const view = (value) => ['button', {click: {add: count}}, value]
main(view, { model: 0 })
```

## More examples

Check more examples [in the documentation](./docs/examples.md).

## Install

Act is written in es6 and expects you to use webpack, so you can import only
the files you really need. To install, just run in your project folder:

```shell
npm i @act/main -s
```

## Getting started

The easiest way to start a new Act project is by checking out [act-starter](https://github.com/joaomilho/act-starter).

This project will give you a very basic setup that you can use to bootstrap an
Act project, including babel and webpack config for development.

## Contributing

Act is still in a very alpha status. If you wanna help, take a look at the
[ideas for improvement](docs/todo.md).
