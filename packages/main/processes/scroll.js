import map from 'zen-signals/map'

export default
  map((ev) => ev.target.pageYOffset || document.body.scrollTop)

