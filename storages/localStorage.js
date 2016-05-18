const get = () =>
  JSON.parse(window.localStorage.getItem('act'))

const set = (data) =>
  window.localStorage.setItem('act', JSON.stringify(data))

export default { get, set }
