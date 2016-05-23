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

export const historySpy = { push: spy() }
export const toVDOM = (json) => jsonToVirtualDOM(json, historySpy)

let callIndex = 0
const event = (event, mockEvent) => (el) => {
  const mockNode = {
    addEventListener (_, fn) {
      fn(mockEvent)
    }
  }

  el.properties[`${event}-handler`].hook(mockNode, `${event}-handler`)
  if (historySpy.push.getCall(callIndex)) {
    const args = historySpy.push.getCall(callIndex).args
    callIndex++
    return {type: args[0], payload: args[1]}
  }
}

// TODO: finish the list of events and export one for each

// mouse events

/**
 * Calls `click` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   click(button)
 */
export const click = event('click')

/**
 * Calls `dblclick` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dblclick(button)
 */
export const dblclick = event('dblclick')

/**
 * Calls `mouseover` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mouseover(button)
 */
export const mouseover = event('mouseover')

/**
 * Calls `mouseout` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mouseout(button)
 */
export const mouseout = event('mouseout')

/**
 * Calls `mouseup` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mouseup(button)
 */
export const mouseup = event('mouseup')

// keyboard events
export const keyboardEvent = (ev) => (el, keyCode, value) =>
  event(ev, { keyCode, target: { value } })

/**
 * Calls `keyup` of an element, generally an input
 *
 * @param {VNode} element
 * @param {number} keyCode
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   keyup(input, 13, 'Rawls')
 */
export const keyup = keyboardEvent('keyup')

/**
 * Calls `keydown` of an element, generally an input
 *
 * @param {VNode} element
 * @param {number} keyCode
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   keydown(input, 13, 'Nozick')
 */
export const keydown = keyboardEvent('keydown')

/**
 * Calls `keypress` of an element, generally an input
 *
 * @param {VNode} element
 * @param {number} keyCode
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   keypress(input, 13, 'Nozick')
 */
export const keypress = keyboardEvent('keypress')

// input events
export const inputEvent = (ev) => (el, value) =>
  event(ev, { target: { value } })

/**
 * Calls `blur` of an input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   blur(input, 'Berlin')
 */
export const blur = inputEvent('blur')

/**
 * Calls `change` of an input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   change(input, 'Putnam')
 */
export const change = inputEvent('change')

/**
 * Calls `focus` of an input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   focus(input, 'Marx')
 */
export const focus = inputEvent('focus')

/**
 * Calls `input` of an input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   input(_input, 'Arendt')
 */
export const input = inputEvent('input')

/**
 * Calls `invalid` of an input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   invalid(input, 'Adorno')
 */
export const invalid = inputEvent('invalid')

/**
 * Calls `search` of a search input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   search(searchInput, 'Husserl')
 */
export const search = inputEvent('search')

// TODO: select may need some extra info, make a test example
/**
 * Calls `select` of a select input
 *
 * @param {VNode} element
 * @param {string} value
 * @returns {Action|undefined}
 * @usage
 *   select(selectInput, 'Popper')
 */
export const select = inputEvent('select')

export const formEvent = (ev) => (el, values) =>
  event(ev, { target: values })

/**
 * Calls `reset` of a form
 *
 * @usage
 *   reset(form, { name: 'Morgenbesser' })
 */
export const reset = formEvent('reset')

/**
 * Calls `submit` of a form
 *
 * @usage
 *   submit(form, { name: 'Nagel' })
 */
export const submit = formEvent('submit')
