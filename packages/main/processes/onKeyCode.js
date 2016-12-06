import filter from 'zen-signals/filter'
import equals from 'ramda/src/equals'
import pipe from 'ramda/src/pipe'
import keyCode from './keyCode'

export default (code) => pipe(
  keyCode,
  filter(equals(code))
)
