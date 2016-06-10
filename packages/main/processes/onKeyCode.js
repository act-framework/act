import filter from '../signals/processes/filter'
import equals from 'ramda/src/equals'
import pipe from '../signals/pipe'
import keyCode from './keyCode'

export default (code) => pipe(
  keyCode,
  filter(equals(code))
)
