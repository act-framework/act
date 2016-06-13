import test from 'tape'
import { getJSON } from '../../../signals/sources/xhr'
import { spy } from 'sinon'

test('getJSON: when is successful', (assert) => {
  const next = spy()
  const error = spy()

  const fakeRequest = {
    status: 200,
    responseText: '{}',
    open: spy(),
    send: spy()
  }

  global.XMLHttpRequest = () => {
    return fakeRequest
  }

  let newRequest = getJSON('/')(next, error)

  assert.deepEqual(newRequest, fakeRequest, 'getJSON returns new XMLHttpRequest')

  newRequest.onload()
  assert.ok(next.called, 'calls next callback when request is successful')
  assert.notOk(error.called, 'never calls error when request is successful')
  assert.ok(fakeRequest.open, 'calls request.open')
  assert.ok(fakeRequest.send, 'calls request.send')

  assert.end()
})

test('getJSON: when it fails', (assert) => {
  const next = spy()
  const error = spy()

  const fakeRequest = {status: 404, open: spy(), send: spy()}

  global.XMLHttpRequest = () => {
    return fakeRequest
  }

  let newRequest = getJSON('/')(next, error)

  assert.deepEqual(newRequest, fakeRequest, 'getJSON returns new XMLHttpRequest')

  newRequest.onload()
  assert.notOk(next.called, 'never calls next when request fails')
  assert.ok(error.called, 'calls error callback when request fails')
  assert.ok(fakeRequest.open, 'calls request.open')
  assert.ok(fakeRequest.send, 'calls request.send')

  assert.end()
})
