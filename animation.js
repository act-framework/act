import AnimationHistory from './internals/AnimationHistory'
import fromAnimationFrame from './signals/sources/FromAnimationFrame'
import Spring from './internals/spring'
import map from './signals/processes/map'
import _main from './'

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
  return _main(view, { ...opts, historyClass: AnimationHistory })
}
export default main
