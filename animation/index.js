import fromAnimationFrame from '@act/main/signals/sources/fromAnimationFrame'
import map from '@act/main/signals/processes/map'
import actMain from '@act/main'
import Spring from './internals/Spring'
import AnimationHistory from './internals/AnimationHistory'

export const springWith = (config) => (callback, finish = () => {}) => {
  const frame = fromAnimationFrame()
  const spring = new Spring(config)
  map(() => {
    spring.moving || frame.stop() || finish()
    return spring.step()
  })(frame.start())(callback)
  return frame
}

export const spring = springWith({})

const main = (view, opts) => {
  return actMain(view, { historyClass: AnimationHistory, ...opts })
}

export default main
