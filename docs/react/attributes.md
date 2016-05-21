# JS vs HTML attribute names

##### React

In React you use the JS attribute names, like `htmlFor` and `className`.

```js
<label htmlFor='name'>Enter your name</label>
<input className='field' id='name' />
```

##### Act

In Act you can use regular HTML names like `for` and `class`.

```js
['label', {for: 'name'}, 'Enter your name']
['input#name', {class: 'field'}]
['input#name.field'] // even shorter
```
