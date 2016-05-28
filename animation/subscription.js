import fromAnimationFrame from '../signals/sources/FromAnimationFrame'
import map from '../signals/processes/map'
import Spring from '../internals/spring'

export const spring = (config) => {
  const frame = fromAnimationFrame()
  const spring = new Spring()
  return map(() => {
    spring.moving || frame.stop()
    return spring.step()
  })(frame.start())
}
