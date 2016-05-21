<center>
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act">
</center>

[![Travis](https://travis-ci.org/joaomilho/act.svg)](https://travis-ci.org/joaomilho/act)
[![npm](https://img.shields.io/npm/v/@act/core.svg?maxAge=2592000)](http://npmjs.com/package/@act/core)

# Act

> The simple reactive front-end framework

## Hello Act

Here's Act's hello world:

```js
main('Hello world')
```

And here's the classic counter example:

```js
const view = (value) => ['button', {click: {add: count}}, value]
const model = 0
main(view, { model })
```

## Install

Act is written in es6 and expects you to use webpack, so you can import only
the files you really need. To install, just run in your project folder:

```shell
npm i @act/core -s
```

## Getting started

The easiest way to start a new Act project is by checking out [act-starter](https://github.com/joaomilho/act-starter).

This project will give you a very basic setup that you can use to bootstrap an
Act project, including babel and webpack config for development.

## Contributing

Act is still in a very alpha status. If you wanna help, take a look at the
[ideas for improvement](docs/todo.md).
