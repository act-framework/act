/*
 * `merge` agreegates any number of sources as if they were one. It doesn't
 * change values in any way.
 *
 * It's usage is slightly different than other processors. Here's the general
 * syntax:
 *
 * ```
 * const mergedSource = merge(sourceA, sourceB)
 * const subscriber = process(mergedSource)
 * ```
 *
 * ```
 * merge(sourceA, sourceB)
 * ```
 * sourceA o---o---o--o----o
 * sourceB --x----x-x---x---
 * emits   o-x-o--xox-o-x--o
 *
 */

import forEach from 'ramda/src/forEach'

export default (...eventSources) => (next) => {
  forEach((source) => source(next), eventSources)
}
