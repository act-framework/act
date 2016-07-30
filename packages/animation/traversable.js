import actMain from '@act/main'
import historyClass from './internals/TraversableAnimationHistory'

const main = (view, opts) =>
  actMain(view, { historyClass, ...opts })

export default main
