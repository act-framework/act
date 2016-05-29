# Changelog

#### 0.0.3

- Remove presenters from `main`. Explain how to use them with `pipe`.
- Change order of side effect functions to be first the payload and then the
  history. It's helpful for curried side effects, like
  `[socket.emit('msg'), valueOnEnter]`.
- Moved ws to its own package.

#### 0.0.2

- Adds concept of presenter
- Spread processes into separate files

#### 0.0.1

- Initial release
