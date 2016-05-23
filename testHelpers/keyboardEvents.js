import event from './event'

export const keyboardEvent = (ev) => (el, keyCode, value) =>
  event(ev, { keyCode, target: { value } })(el)

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
