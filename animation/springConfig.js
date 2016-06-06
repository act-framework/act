import Spring from './internals/Spring'
import fromAnimationFrame from '@act/main/signals/sources/fromAnimationFrame'
import filterMap from '@act/main/signals/processes/filterMap'

const springConfig = (config) => (callback, finish = () => {}) => {
  const frame = fromAnimationFrame()
  const spring = new Spring(config)
  filterMap(() => {
    return spring.moving
      ? spring.step()
      : (frame.stop() || finish() && false)
  })(frame.start())((step) => {
    if (callback.length === 1) return callback(step.current)
    if (callback.length === 2) return callback(step.current, step.velocity)

    return callback(step)
  })
  return frame
}

export default springConfig
