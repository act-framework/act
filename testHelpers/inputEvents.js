import event from './event'

export const inputEvent = (ev) => (el, value) =>
  event(ev, { target: { value } })(el)

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
