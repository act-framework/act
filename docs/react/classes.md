# class-names vs class-lists

##### React

In React you're supposed to use the [`classnames`](http://npmjs.com/package/classnames)
package to construct class names that depend on certain conditions.

```js
import classNames from 'class-names'

// only true matters
const menuItem = ({ title, selected }) => (
  <li className={classNames({'is-selected': selected})}>
    {title}
  </li>
)

const items = [
  {title: 'Home', selected: true},
  {title: 'FAQ', selected: false}
]

// both matter
const menu = ({ open }) => (
  <ol id='menu' className={classNames({'is-open': open, 'is-closed': !open})}>
    {map(menuItem, items)}
  </oi>
)
```

##### Act

In Act you simply use lists, just like in the [`class-lists` package](https://www.npmjs.com/package/class-lists).

```js
// only true matters
const menuItem = ({ title, selected }) => (
  ['li', {class: [['is-selected': selected]]}, title]
)

const items = [
  {title: 'Home', selected: true},
  {title: 'FAQ', selected: false}
]

// both matter
const menu = ({ open }) => (
  ['ol#menu', {class: [[open: 'is-open', 'is-closed']]}, map(menuItem, items)]
)
```

And if you're using [css-modules](https://github.com/css-modules/css-modules), you need no special binding, just do:

```
import styles from './styles.css'

... { class: [styles, 'class', 'another_class'] } ...