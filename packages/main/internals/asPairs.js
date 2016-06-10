import toPairs from 'ramda/src/toPairs'
import isArrayLike from 'ramda/src/isArrayLike'

export default (plainObjectOrArray) =>
  isArrayLike(plainObjectOrArray)
    ? plainObjectOrArray
    : toPairs(plainObjectOrArray)
