# JSX vs JSON

##### React

In React you either build your components manually – almost no one does that –
or you use JSX (to be fair there's also a [hyperscript](https://github.com/mlmorg/react-hyperscript)
library). JSX tries to emulate HTML, but it is different in many ways. Here's
some JSX:

```js
<h1 className='title'>
  { someVariable }
</h1>
```

##### Act

In Act, all views are defined in a JSON format. This is the syntax for a tag:

```js
[tagName, attributes, children]
```

Here, `tagName` is any HTML tag name, like `h1` or `div`. `attributes` is an
object with all tag's attributes, like `type` or `checked`. Finally, `children`
may be an array or a single item, like a string or a number.

Both `attributes` and `children` are optional, so, if you don't define any
attribute, the children will go on the second index of the array.

You can also use virtual-dom's special syntax for classes and ids (more on
"Class and id shortcuts" section below).

React's example above would be translated to:

```js
['h1.title', someVariable]
```
