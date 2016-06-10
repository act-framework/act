/*
 * Combines a list of reducers.
 *
 * @param {object} reducers - An object with keys and reducers as values.
 * @returns {function} A new reducer that will only pass and update the state
 * under the corresponding key to each combined reducer.
 */

import mapObjIndexed from 'ramda/src/mapObjIndexed'

const combine = (reducers) => (state = {}, action) => {
  state = mapObjIndexed((reducer, namespace) => (
    reducer(state[namespace], action, state)
  ), reducers)

  return state
}

export default combine
