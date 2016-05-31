# Using JSON for rendering

In Act, all views are defined in a - sort of! - JSON format. This is the syntax
for a tag:

```js
[tagName, attributes, children]
```

Here, `tagName` is any HTML tag name, like `h1` or `div`. `attributes` is an
object with all tag's attributes, like `type` or `checked`. Finally, `children`
may be an array or a single item, like a string or a number.

Both `attributes` and `children` are optional, so, if you don't define any
attribute, the children will go on the second index of the array:

```js
[tagName, children]
```

You can also use virtual-dom's special syntax for classes and ids:

```js
['h1.title', ...]
['#menu', ...]
```

One of the advantages of this approach is testing your components, since if you
just wanna check that they return the right thing you don't need any special
rendering library or function.
