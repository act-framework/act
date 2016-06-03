/*
 * `transduce` gets the current value in the process and applies a
 * transformation to it.
 *
 * In practice it will differ from Act's map in a number of ways.
 *
 * First, is that it puts the current value into a list and then "unboxes" it in
 * the end of the process, therefore allowing the use of regular list operation
 * functions (by that I mean Ramda's functions, instead os Act's basic
 * processes).
 *
 * [In the following examples I'll treat any function prefixed with `R.` as a
 * Ramda function and the others Act's.]
 *
 * ```
 * // this will not work since the value is not a list (returns a list with undefined)
 * map(R.map(R.add(1)))
 * // this will work, but the result will be a list
 * map(R.pipe(R.of, R.map(R.add(1))))
 * // this will work
 * map(R.pipe(R.of, R.map(R.add(1)), R.head))
 *
 * // same as above, but no need of boxing/unboxing
 * transduce(R.map(R.add(1)))
 * ```
 *
 * The second is that it it will not emit any value if the result of the
 * transducer is `undefined` or doesn't have a result, which will be the case
 * if you apply any filter (again, a regular filter) that rejects the value,
 * while using `map` will still emit `undefined`.
 *
 * ```
 * // will emit `undefined` if value is <= 60
 * map(R.pipe(R.of, R.filter(R.gt(R.__, 60)), R.head))
 *
 * // doesn't emit anything if value =< 60
 * transduce(R.filter(R.gt(R.__, 60)))
 * ```
 *
 * One important consideration is that if you have any function in the
 * transducer process after the filter this function _will_ receive the
 * `undefined`. Only the next Act process will not be called if the final
 * result is undefined. This may be useful to "recover" from `undefineds`. A
 * final suggestion is that if this is your scenario it may be more interesting
 * to take a look at some `Maybe` implementation that conforms to Fantasy Land,
 * and use this data type in yout transformation.
 *
 *                         map (+1) [6] -> filter (>4) []
 *                       /                                \
 * signal 5 -> transduce                                    * (doesn't continue)
 *
 * Finally transduce runs processes "inside out" so compose will run from left
 * to right.
 *
 * ```
 * transduce(R.compose(R.map(R.add(1), R.filter(R.gt(4))))
 * ```
 * changes 12345678
 * emits   ---56789
 */

import transduce from 'ramda/src/transduce'
import flip from 'ramda/src/flip'
import append from 'ramda/src/append'
import head from 'ramda/src/head'
import of from 'ramda/src/of'
import build from './build'

export default build((xform, next, value) => {
  const transducer = transduce(xform, flip(append), [])

  const result = head(transducer(of(value)))
  typeof result !== 'undefined' && next(result)
})
