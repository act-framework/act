/* globals fetch */

const config = ({ url, method = 'get', body }) => (
  [
    url,
    {
      method,
      credentials: 'same-origin',
      body: body && JSON.stringify(body),
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'application/json'
      }
    }
  ]
)

const validateStatus = (response) => {
  if (!response.ok) {
    throw response
  }
  return response
}

const parseContent = (response) => response.json()

const fromFetch = (fn) => (...args) => (next, error) => {
  return fetch(...config(fn(...args)))
    .then(validateStatus)
    .then(parseContent)
    .then(next)
    .catch(error)
}

export default fromFetch
