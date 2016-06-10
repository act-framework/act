/* globals XMLHttpRequest */
// TODO: implement abort on stop,
// like in https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/src/ajax/ajax.js#L177

export const request = (next, error = () => {}) => {
  const request = new XMLHttpRequest()
  request.onload = () => {
    ok(request)
      ? next(request)
      : error(request, new Error(request.statusText))
  }
  return request
}

export const get = (url) => (next, error) => {
  const r = request(next, error)
  r.open('GET', url)
  r.send()
}

const ok = ({status}) =>
  status >= 200 && status < 300

const parse = ({responseText}) => {
  try {
    return [JSON.parse(responseText), null]
  } catch (e) {
    return [null, e]
  }
}

export const getJSON = (url) => (next, error = () => {}) => {
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (ok(request)) {
      const [json, e] = parse(request)
      json
        ? next(json)
        : error(request.responseText, new Error(e))
    } else {
      error(request.responseText, new Error(request.statusText))
    }
  }
  request.open('GET', url)
  request.send()
}

export const post = (url, body = {}) => (next, error) => {
  const request = request(next, error)
  request.open('POST', url)
  if (typeof body === 'object') {
    body = JSON.stringify(body)
    request.setRequestHeader('Content-Type', 'application/json')
  }
  request.send(body)
}
