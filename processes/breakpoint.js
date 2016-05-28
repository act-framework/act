import distinct from '../signals/processes/distinct'
import find from 'ramda/src/find'
import head from 'ramda/src/head'
import map from '../signals/processes/map'
import pipe from '../signals/pipe'
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
    head(find(([breakpoint, max]) => width > max, toPairs(config)))),
  distinct
)
