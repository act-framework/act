<p align="center" style="font-family: Raleway-ExtraLight, Raleway, Proxima Nova, Avenir, Arial, sans">
  <img src="https://raw.githubusercontent.com/joaomilho/act/master/docs/logo.png" width="100" alt="Act" />
  <br />
  A simple reactive front-end framework
  <br /><br />
  <a href="https://travis-ci.org/joaomilho/act"><img src="https://travis-ci.org/joaomilho/act.svg" /></a>
  &nbsp; 
  <a href="http://npmjs.com/package/@act/main"><img src="https://img.shields.io/npm/v/@act/main.svg?maxAge=2592000" /></a>
  &nbsp; 
  <a href="https://gitter.im/joaomilho/act?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/joaomilho/act.svg" alt="Join the chat at https://gitter.im/joaomilho/act" /></a>
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

* [counter composition](http://joaomilho.github.io/act/examples/counter/) (like
  in Elm's architechture examples).
  ([code](https://github.com/joaomilho/act/blob/master/examples/counter/))
* [kanban board](http://joaomilho.github.io/act/examples/drag_n_drop/) with
  drag & drop.
  ([code](https://github.com/joaomilho/act/blob/master/examples/drag_n_drop/))
* hot module replacement (hmr) [code](https://github.com/joaomilho/act/blob/master/hmr/examples/) (you have to run yourself)
* [animation](http://joaomilho.github.io/act/examples/animation/) [code](https://github.com/joaomilho/act/blob/master/examples/animation/)
* [todomvc](http://joaomilho.github.io/act/examples/todomvc/) [code](https://github.com/joaomilho/act/blob/master/examples/todomvc/) (full build: 13.4kb minified & gzipped) (code: ~80LsoC without imports)
* [bmi calculator](http://joaomilho.github.io/act/examples/bmi/) [code](https://github.com/joaomilho/act/blob/master/examples/bmi/)
* [optimistic updates](http://joaomilho.github.io/act/examples/optimistic/) [code](https://github.com/joaomilho/act/blob/master/examples/optimistic/)

Check even more examples [in the documentation](http://lulk.in/act/docs/examples.html).

## Why?

##### Functional

Act is built on top of [Ramda](http://ramdajs.com) and encourages a functional
programming style.

##### Small

Act is small and most functionality is added by different modules, resulting on
small builds. The TodoMVC has 13.4kb (min+gz).

##### Transparent

Act's internal code should be owned by its users, therefore simplicity and
readability are valued.

##### Complete

Act tries to be as complete as possible, and have clearly defined ways of doing
the most common tasks.

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
