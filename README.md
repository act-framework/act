![Travis](https://travis-ci.org/joaomilho/act.svg)

![Act](https://raw.githubusercontent.com/joaomilho/act/master/docs/symbol.svg)

# ACT

> A simple reactive front-end framework

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
