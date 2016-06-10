import filterMap from '../signals/processes/filterMap'

export default filterMap((ev) => ev.keyCode === 13 && ev.target.value.trim())

