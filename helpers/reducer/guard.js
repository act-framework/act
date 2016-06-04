import equals from 'ramda/src/equals'
import T from 'ramda/src/T'
import always from 'ramda/src/always'
import converge from 'ramda/src/converge'
import cond from 'ramda/src/cond'
import map from 'ramda/src/map'
import append from 'ramda/src/append'
import pipe from 'ramda/src/pipe'
import flip from 'ramda/src/flip'
import identity from 'ramda/src/identity'
import asPairs from '../../internals/asPairs'

const buildGuardItem = ([_, [typeOrCond, handler]]) =>
  [
    typeof typeOrCond === 'string' ? equals(typeOrCond) : typeOrCond,
    typeof handler === 'function'
      ? (_, state, payload) => handler(state, payload)
      : always(handler)
  ]

const appendDefault = append([T, flip(identity)])

const buildGuard = converge(pipe(appendDefault, cond), [map(buildGuardItem)])

export default (guardConfig) => {
  const guard = buildGuard(asPairs(guardConfig))
  return (state, action) => guard(action.type, state, action.payload)
}
