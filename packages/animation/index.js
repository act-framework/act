import actMain from '@act/main'
import AnimationHistory from './internals/AnimationHistory'

const main = (view, opts) =>
  actMain(view, { historyClass: AnimationHistory, ...opts })

export default main
