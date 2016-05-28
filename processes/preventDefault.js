/*
 * `preventDefault`
 *
 * Doesn't change the passed value, but prevents its default behaviour.
 *
 * Since it calls a `preventDefault` method in the value, it's mainly supposed
 * to be used directly unto DOM events, but you may also have custom values
 * with this method.
 *
 */

import map from '../signals/processes/map'

export default map((ev) => {
  ev.preventDefault()
  return ev
})
