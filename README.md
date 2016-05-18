![Travis](https://travis-ci.org/joaomilho/act.svg)

![Act](docs/symbol.svg)

# ACT

> A simple reactive front-end framework

## Hello Act

Here's Act's hello world:

```js
main('Hello world')
```

And here's the classic counter example:

```js
main(
  (count) => ['button', {click: {add: 1}}, count],
  0,
  (state, {payload}) => state + payload
)
```

## Install

Act is written in es6 and expects you to use webpack, so you can import only
the files you really need. To install, just run in your project folder:

```shell
npm i @act/core -s
```
