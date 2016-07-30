import main from '../..'
import { history, spring } from '../../animation'
import styles from './styles.css'
import position from '../../processes/position'

let currentSpring
const start = (history, payload) => {
  history.push({type: 'dest', payload})
  currentSpring && currentSpring.stop()

  currentSpring = spring({})(
    (payload) => history.push({type: 'step', payload}),
    () => console.log('FINISHED')
  )
}

const view = ({ current }) => (
  ['main', [
    ['div', {
      click: [start, position],
      style: {
        border: '2px dashed black',
        height: 600
      }
    }],
    ['div', {class: [styles, 'dot'], style: {
      left: current[0],
      top: current[1]}}]
  ]]
)

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'dest':
      return { ...state, dest: payload, previous: state.current }
    case 'step':
      const [x, y] = state.previous
      const [x2, y2] = state.dest
      const diffX = (x2 - x) / 100
      const diffY = (y2 - y) / 100
      return { ...state, current: [x + (payload * diffX), y + (payload * diffY)] }
    default:
      return state
  }
}

main(view, {
  model: { dest: [0, 0], current: [0, 0] },
  historyClass: history,
  reducer
})
