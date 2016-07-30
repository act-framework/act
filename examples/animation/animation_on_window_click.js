import main, { spring } from '../../animation'
import styles from './styles.css'
import { clickPosition } from '../../subscriptions/window'

let currentSpring
const start = (history, payload) => {
  history.push({type: 'dest', payload})
  currentSpring && currentSpring.stop()

  currentSpring = spring({})(
    (payload) => history.push({type: 'step', payload})
  )
}

const view = ({ current }, history) =>
  ['div', { class: [styles, 'dot'], style: { left: current[0], top: current[1] } }]

const subscriptions = [[start, clickPosition]]

const reducer = (state = { dest: [0, 0], current: [0, 0] }, { type, payload }) => {
  switch (type) {
    case 'dest':
      return { ...state, dest: payload, previous: state.current }
    case 'step':
      const { previous: [x, y], dest: [x2, y2] } = state
      return { ...state, current: [x + (payload * (x2 - x)), y + (payload * (y2 - y))] }
    default:
      return state
  }
}

main(view, { reducer, subscriptions })
