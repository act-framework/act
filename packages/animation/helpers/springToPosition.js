import position from 'main/processes/position'
import spring from 'animation/spring'

let currentSpring
const start = (payload, history) => {
  history.push({ type: 'dest', payload })
  currentSpring && currentSpring.stop()

  currentSpring = spring(
    (payload) => history.push({ type: 'step', payload }),
    () => history.push({type: 'finish'})
  )
}

export default [start, position]
