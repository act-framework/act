/*
 * Act test helpers
 *
 * NOTE: this module requires `sinon`
 *
 */

import jsonToVirtualDOM from './internals/jsonToVirtualDOM'
import { spy } from 'sinon'
import _main from './'

export const main = (view, config) => {
  const insertBefore = spy()
  const node = { insertBefore }

  return _main(view, { node, ...config })
}

export const updateSpy = spy()

export const toVDOM = (json) => jsonToVirtualDOM(json, updateSpy)

let callIndex = 0
const event = (event) => (el, mockEvent) => {
  const mockNode = {
    addEventListener (_, fn) {
      fn(mockEvent)
    }
  }

  el.properties[`${event}-handler`].hook(mockNode, `${event}-handler`)
  if (updateSpy.getCall(callIndex)) {
    const args = updateSpy.getCall(callIndex).args
    callIndex++
    return {type: args[0], payload: args[1]}
  }
}

// TODO: finish the list of events and export one for each
export const click = event('click')

export const keyup = (keyCode, value, el) => {
  return event('keyup')(el, { keyCode, target: { value } })
}

// TODO: specialize keyup with "onEnter", "onEsc"...
