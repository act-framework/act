# Changelog

#### 0.0.6

- Adds `lens` view helper.
- Passes the state to any function inside views by default, if they already
  don't get data. That's useful for `lens` and any other data transform one
  might want to do.
- Simplifies the implementation of some processes.
- Fix error when invalid element is not a tag.
- Adds initial `guard`, an idiomatic way of building reducers.
- Adds `transduce` process.

#### 0.0.5

- Fixes naiveSerialize.

#### 0.0.4

- Adds toNode internal so require less from virtual-dom (don't change API);
- Adds initial devtools module... still too raw.
- Adds initial hmr module. Also not mature.

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
