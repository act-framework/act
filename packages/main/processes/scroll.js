import map from '../signals/processes/map'

export default
  map((ev) => ev.target.pageYOffset || document.body.scrollTop)

