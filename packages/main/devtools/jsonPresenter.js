import toPairs from 'ramda/src/toPairs'
import map from 'ramda/src/map'
import isArrayLike from 'ramda/src/isArrayLike'
import repeat from 'ramda/src/repeat'

const css = {
  key: {
    color: '#999'
  },
  string: {
    color: '#090'
  },
  number: {
    color: '#36f'
  },
  boolean: {
    color: '#900'
  }
}

const jsonPresenter = (json, lvl = 1) => {
  const type = typeof json
  switch (true) {
    case type === 'string':
    case type === 'number':
    case type === 'boolean':
      return ['span', { style: css[type] }, JSON.stringify(json)]
    case isArrayLike(json):
      return ['span', [
        '(', json.length, ')',
        ...map((val) =>
            ['span', [
              ['br'],
              jsonPresenter(val, lvl + 1)
            ]]
            , json),
        json.length > 0 && ['br']
      ]]
    default:
      return ['span', [
        ...map(([key, val]) =>
            ['span', [
              ['br'],
              ['span', { innerHTML: repeat('&nbsp;', (lvl - 1) * 2).join('')}],
              ['span', { style: css.key }, key],
              ' ',
              jsonPresenter(val, lvl + 1)
            ]]
            , toPairs(json)),
      ]]
  }
}

export default jsonPresenter
