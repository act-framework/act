import distinct from 'zen-signals/distinct'
import find from 'ramda/src/find'
import head from 'ramda/src/head'
import map from 'zen-signals/map'
import pipe from 'ramda/src/pipe'
import toPairs from 'ramda/src/toPairs'
import width from './width'

// from http://foundation.zurb.com/sites/docs/media-queries.html
const defaultBreakpoints = {
  xxlarge: 1440,
  xlarge: 1200,
  large: 1024,
  medium: 640,
  small: 0
}

export default (config = defaultBreakpoints) => pipe(
  width,
  map((width) =>
    head(find(([breakpoint, max]) => width >= max, toPairs(config)))),
  distinct
)
