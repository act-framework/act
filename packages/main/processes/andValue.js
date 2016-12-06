import map from 'zen-signals/map'

export default (otherValue) =>
  map((value) => ({value, ...otherValue}))
