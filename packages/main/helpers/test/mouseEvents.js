import event from './event'

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
 * Calls `drag` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   drag(button)
 */
export const drag = event('drag')

/**
 * Calls `dragend` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dragend(button)
 */
export const dragend = event('dragend')

/**
 * Calls `dragenter` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dragenter(button)
 */
export const dragenter = event('dragenter')

/**
 * Calls `dragleave` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dragleave(button)
 */
export const dragleave = event('dragleave')

/**
 * Calls `dragover` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dragover(button)
 */
export const dragover = event('dragover')

/**
 * Calls `dragstart` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   dragstart(button)
 */
export const dragstart = event('dragstart')

/**
 * Calls `drop` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   drop(button)
 */
export const drop = event('drop')

/**
 * Calls `mousedown` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mousedown(button)
 */
export const mousedown = event('mousedown')

/**
 * Calls `mousemove` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mousemove(button)
 */
export const mousemove = event('mousemove')

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
 * Calls `mouseover` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mouseover(button)
 */
export const mouseover = event('mouseover')

/**
 * Calls `mouseup` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   mouseup(button)
 */
export const mouseup = event('mouseup')

/**
 * Calls `scroll` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   scroll(button)
 */
export const scroll = event('scroll')

/**
 * Calls `wheel` of an element
 *
 * @param {VNode} element
 * @returns {Action|undefined}
 * @usage
 *   wheel(button)
 */
export const wheel = event('wheel')

