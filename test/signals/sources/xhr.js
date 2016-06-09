import test from 'tape'
import { request } from '../../../signals/sources/xhr'
import { spy } from 'sinon'

test('request: when is successful', (assert) => {
  const next = spy()
  const error = spy()

  const fakeRequest = {status: 200}
  global.XMLHttpRequest = () => {
    return fakeRequest
  }

  let newRequest = request(next, error)

  assert.deepEqual(newRequest, fakeRequest, 'request returns new XMLHttpRequest')

  newRequest.onload()
  assert.ok(next.called, 'calls next callback when request is successful')
  assert.notOk(error.called, 'never calls error when request is successful')

  assert.end()
})

test('request: when it fails', (assert) => {
  const next = spy()
  const error = spy()

  const fakeRequest = {status: 404}
  global.XMLHttpRequest = () => {
    return fakeRequest
  }

  let newRequest = request(next, error)

  assert.deepEqual(newRequest, fakeRequest, 'request returns new XMLHttpRequest')

  newRequest.onload()
  assert.notOk(next.called, 'never calls next when request fails')
  assert.ok(error.called, 'calls error callback when request fails')

  assert.end()
})
