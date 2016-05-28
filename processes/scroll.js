import map from '../signals/processes/map'

export default
  map((ev) => window.pageYOffset || document.body.scrollTop)

