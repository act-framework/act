export default (namespace, fn) => (ev, update) => {
  update(`${namespace}.loading`)

  fn()(
    (json) => update(`${namespace}.success`, json),
    (r) => update(`${namespace}.failure`, r.statusText || r.message)
  )
}
