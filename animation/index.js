import fromAnimationFrame from '@act/main/signals/sources/fromAnimationFrame'
import map from '@act/main/signals/processes/map'
import actMain from '@act/main'
import Spring from './internals/Spring'
import TraversableAnimationHistory from './internals/TraversableAnimationHistory'

export const spring = (config) => (callback, finish = () => {}) => {
  const frame = fromAnimationFrame()
  const spring = new Spring()
  map(() => {
    spring.moving || frame.stop() || finish()
    return spring.step()
  })(frame.start())(callback)
  return frame
}

const main = (view, opts) => {
  return actMain(view, { ...opts, historyClass: TraversableAnimationHistory })
}

export default main
