import view from 'ramda/src/view'
import lensPath from 'ramda/src/lensPath'
import curryN from 'ramda/src/curryN'

/*
 * `lens`
 *
 * Filters your data based on a selector. Not this function is curried, so you
 * can simply reuse filters.
 *
 * @param {array} selector
 * @param {function} viewFn
 * @usage
 * ```
 * const showGranpaName = (name) => ['h1', ['Hello ', name, ' !']]
 * const getGranpaName = lens(['user', 'father', 'father', 'name'])
 * const view = getGrandpaName(showGranpaName)
 *
 * model = { user: { father: { father: { name: 'Joe' } } } }
 * main(view, { model })
 * ```
 */

export default curryN(3, (selector, viewFn, model) =>
  viewFn(view(lensPath(selector), model))
)
