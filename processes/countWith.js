import add from 'ramda/src/add'
import always from '../signals/processes/always'
import pipe from '../signals/pipe'
import fold from '../signals/processes/fold'

export default (amount = 1) => pipe(
  always(amount),
  fold(add, 0)
)
