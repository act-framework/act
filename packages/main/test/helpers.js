import test from 'tape'
import { spy } from 'sinon'

export function getNext (fn, cb) {
  const signal = spy()
  const next = spy()
  fn(signal)(next)

  const handler = signal.getCall(0).args[0]
  cb(handler, next)
}

export function testCallsNextWith (label, fn, input, output) {
  test(label, (assert) => {
    getNext(fn, (handler, next) => {
      handler(input)
      assert.deepEqual(next.lastCall.args, [output])
    })

    assert.end()
  })
}
