import map from '../signals/processes/map'

export default (otherValue) =>
  map((value) => ({value, ...otherValue}))
