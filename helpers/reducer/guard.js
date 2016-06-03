// TODO: allow passing arrays with more conditions

import equals from 'ramda/src/equals'
import T from 'ramda/src/T'
import always from 'ramda/src/always'
import converge from 'ramda/src/converge'
import cond from 'ramda/src/cond'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import append from 'ramda/src/append'
import toPairs from 'ramda/src/toPairs'

const buildGuardItem = ([typeOrCond, handler]) =>
  [
    typeof typeOrCond === 'string' ? equals(typeOrCond) : typeOrCond,
    typeof handler === 'function'
      ? (_, state, payload) => handler(state, payload)
      : always(handler)
  ]

const appendDefault = append([T, (_, state) => state])

const buildGuard = converge(pipe(appendDefault, cond), [pipe(toPairs, map(buildGuardItem))])

export default (guardConfig) => {
  const guard = buildGuard(guardConfig)
  return (state, action) => guard(action.type, state, action.payload)
}
