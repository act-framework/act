import main from '../..'
import { history, spring } from '../../animation'
import styles from './styles.css'
import { clickPosition } from '../../subscriptions/window'

let currentSpring
const start = (history, payload) => {
  history.push({type: 'dest', payload})
  currentSpring && currentSpring.stop()

  currentSpring = spring({})(
    (payload) => history.push({type: 'step', payload}),
    () => console.log('FINISHED')
  )
}

const view = ({ current }, history) => (
  ['main', [
    ['div', {class: [styles, 'dot'], style: {
      left: current[0],
      top: current[1]}}]
  ]]
)

const sideEffects = [
  [clickPosition, start]
]

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'dest':
      return { ...state, dest: payload, previous: state.current }
    case 'step':
      // say current is 0, 0, and dest is 100, 0
      // and step is 5
      const [x, y] = state.previous
      const [x2, y2] = state.dest
      const newX = x + (payload * (x2 - x) / 100)
      const newY = y + (payload * (y2 - y) / 100)
      return { ...state, current: [newX, newY] }
    default:
      return state
  }
}

main(view, {
  model: { dest: [0, 0], current: [0, 0] },
  historyClass: history,
  reducer,
  sideEffects
})
