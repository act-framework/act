import { getJSON } from '../../src/signals/sources/xhr'

export default (namespace, url) => (_, update) => {
  update(`${namespace}.loading`)
  getJSON(url)(
    (json) => update(`${namespace}.success`, json),
    (response, error) => update(`${namespace}.failure`, {response, error})
  )
}
