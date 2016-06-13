import test from 'tape'
import { spy } from 'sinon'
import breakpoint from '../processes/breakpoint'
import count from '../processes/count'
import dimensions from '../processes/dimensions'
import hash from '../processes/hash'
import height from '../processes/height'
import keyCode from '../processes/keyCode'
import naiveSerialize from '../processes/naiveSerialize'
import onEnter from '../processes/onEnter'
import onEsc from '../processes/onEsc'
import onKeyCode from '../processes/onKeyCode'
import position from '../processes/position'
import preventDefault from '../processes/preventDefault'
import random from '../processes/random'
import scroll from '../processes/scroll'
import target from '../processes/target'
import value from '../processes/value'
import valueAnd from '../processes/valueAnd'
import valueAndKeyCode from '../processes/valueAndKeyCode'
import valueOnEnter from '../processes/valueOnEnter'
import valueOnEnterAnd from '../processes/valueOnEnterAnd'
import width from '../processes/width'

const getNext = (fn, cb) => {
  const signal = spy()
  const next = spy()
  fn(signal)(next)

  const handler = signal.getCall(0).args[0]
  cb(handler, next)
}

const callsNext = (label, fn, input, output) => {
  test(label, (assert) => {
    getNext(fn, (handler, next) => {
      handler(input)
      assert.deepEqual(next.lastCall.args, [output])
    })

    assert.end()
  })
}

callsNext('dimensions', dimensions, { target: { innerHeight: 7, innerWidth: 6 } }, [6, 7])
callsNext('hash', hash, { target: { location: { hash: '#abc' } } }, 'abc')
callsNext('height', height, { target: { innerHeight: 6 } }, 6)
callsNext('value', value, { target: { value: 5 } }, 5)
callsNext('target', target, { target: 10 }, 10)
callsNext('valueAnd', valueAnd({ horsemen: 4 }), { target: { value: 5 } }, { value: 5, horsemen: 4 })
callsNext('valueAndKeyCode', valueAndKeyCode, { target: { value: 5 }, keyCode: 6 }, [5, 6])
callsNext('keyCode', keyCode, { keyCode: 6 }, 6)
callsNext('width', width, { target: { innerWidth: 7 } }, 7)
callsNext('position', position, { pageX: 1, pageY: 2 }, [1, 2])
callsNext('scroll', scroll, { target: { pageYOffset: 8 } }, 8)

test('breakpoint', (assert) => {
  getNext(breakpoint({a: 1500, b: 500, c: 0}), (handler, next) => {
    handler({ target: { innerWidth: 0 } })
    assert.deepEqual(next.lastCall.args, ['c'])

    handler({ target: { innerWidth: 500 } })
    assert.deepEqual(next.lastCall.args, ['b'])

    handler({ target: { innerWidth: 1500 } })
    assert.deepEqual(next.lastCall.args, ['a'])
  })

  assert.end()
})

test('count', (assert) => {
  getNext(count, (handler, next) => {
    handler()
    assert.deepEqual(next.lastCall.args, [1])

    handler()
    assert.deepEqual(next.lastCall.args, [2])

    handler()
    assert.deepEqual(next.lastCall.args, [3])
  })

  assert.end()
})

test('valueOnEnter', (assert) => {
  getNext(valueOnEnter, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, ['foo'])

    handler({ target: { value: 'foo' }, keyCode: 6 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

test('valueOnEnterAnd', (assert) => {
  getNext(valueOnEnterAnd({ horsemen: 4 }), (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, [{ value: 'foo', horsemen: 4 }])

    handler({ target: { value: 'foo' }, keyCode: 6 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})


test('random', (assert) => {
  Math.random = () => 6
  getNext(random, (handler, next) => {
    handler()
    assert.deepEqual(next.lastCall.args, [6])
  })

  assert.end()
})

test('preventDefault', (assert) => {
  const ev = { preventDefault: spy() }
  getNext(preventDefault, (handler, next) => {
    handler(ev)
    assert.ok(ev.preventDefault.called)
  })

  assert.end()
})

test('onKeyCode', (assert) => {
  getNext(onKeyCode(66), (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 66 })
    assert.deepEqual(next.lastCall.args, [66])

    handler({ target: { value: 'foo' }, keyCode: 67 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

test('onEnter', (assert) => {
  getNext(onEnter, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 13 })
    assert.deepEqual(next.lastCall.args, [13])

    handler({ target: { value: 'foo' }, keyCode: 14 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

test('onEsc', (assert) => {
  getNext(onEsc, (handler, next) => {
    handler({ target: { value: 'foo' }, keyCode: 27 })
    assert.deepEqual(next.lastCall.args, [27])

    handler({ target: { value: 'foo' }, keyCode: 28 })
    assert.ok(next.calledOnce)
  })

  assert.end()
})

test('naiveSerialize', (assert) => {
  const ev = { preventDefault: spy(), target: [{ name: 'foo', value: 'bar' }] }

  getNext(naiveSerialize, (handler, next) => {
    handler(ev)
    assert.deepEqual(next.lastCall.args, [{ foo: 'bar' }])
    assert.ok(ev.preventDefault.called)
  })

  assert.end()
})

