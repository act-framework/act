import toPairs from 'ramda/src/toPairs'

export default (plainObjectOrArray) =>
  typeof plainObjectOrArray === 'object'
    ? toPairs(plainObjectOrArray)
    : plainObjectOrArray
