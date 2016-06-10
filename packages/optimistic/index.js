import actMain from '@act/main'
import OptimisticHistory from './internals/OptimisticHistory'

const main = (view, opts) => {
  return actMain(view, { historyClass: OptimisticHistory, ...opts })
}

export default main
