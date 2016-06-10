import map from '../signals/processes/map'

export default
  map((ev) => [ev.target.value, ev.keyCode])
