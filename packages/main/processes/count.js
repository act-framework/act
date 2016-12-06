import add from 'ramda/src/add'
import always from 'zen-signals/always'
import pipe from 'ramda/src/pipe'
import fold from 'zen-signals/fold'

export default pipe(
  always(1),
  fold(add, 0)
)
