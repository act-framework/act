import filterMap from 'zen-signals/filterMap'

export default filterMap((ev) => ev.keyCode === 13 && ev.target.value.trim())

