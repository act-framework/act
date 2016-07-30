/* globals XMLHttpRequest */
// TODO: implement abort on stop,
// like in https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/src/ajax/ajax.js#L177
import compose from 'ramda/src/compose'

const sendRequest = (builder) => {
  const r = new XMLHttpRequest()
  r.send(builder(r))
  return r
}

const openGet = (url) => (request) => { request.open('GET', url) }

const openPost = (url) => (request) => {
  request.open('POST', url)
  return request
}

const load = (next, error) => (request) => {
  request.onload = () => {
    ok(request)
      ? next(request)
      : error(request, new Error(request.statusText))
  }
  return request
}

const loadJSON = (next, error) => (request) => {
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
  return request
}

const ok = ({status}) => status >= 200 && status < 300

const parse = ({responseText}) => {
  try {
    return [JSON.parse(responseText), null]
  } catch (e) {
    return [null, e]
  }
}

export const get = (url) => (next, error) => {
  const builder = compose(
    openGet(url),
    load(next, error)
  )
  return sendRequest(builder)
}

export const getJSON = (url) => (next, error = () => {}) => {
  const builder = compose(
    openGet(url),
    loadJSON(next, error)
  )
  return sendRequest(builder)
}

export const post = (url, body = {}) => (next, error) => {
  const builder = compose(
    (request) => {
      if (typeof body === 'object') {
        body = JSON.stringify(body)
        request.setRequestHeader('Content-Type', 'application/json')
      }
      return body
    },
    openPost(url),
    loadJSON(next, error)
  )
  return sendRequest(builder)
}
