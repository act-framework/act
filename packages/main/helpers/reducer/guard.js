import always from 'ramda/src/always'
import append from 'ramda/src/append'
import asPairs from '../../internals/asPairs'
import cond from 'ramda/src/cond'
import converge from 'ramda/src/converge'
import equals from 'ramda/src/equals'
import flip from 'ramda/src/flip'
import identity from 'ramda/src/identity'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import T from 'ramda/src/T'

const buildGuardItem = ([typeOrCond, handler]) => {
  return [
    typeof typeOrCond === 'string' ? equals(typeOrCond) : typeOrCond,
    typeof handler === 'function'
      ? (_, state, payload) => {
        return handler(state, payload)
      }
      : always(handler)
  ]
}

const appendDefault = append([T, flip(identity)])

const buildGuard = converge(pipe(appendDefault, cond), [map(buildGuardItem)])

export default (guardConfig) => {
  const guard = buildGuard(asPairs(guardConfig))
  return (state, action) => guard(action.type, state, action.payload)
}
