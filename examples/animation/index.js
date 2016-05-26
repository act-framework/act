import main, { spring } from '../../animation'
import styles from './styles.css'
import { value, positionsImmediate } from '../../processes'

let currentSpring
const start = (history, payload) => {
  history.push({type: 'dest', payload})
  currentSpring && currentSpring.stop()

  currentSpring = spring({})(
    (payload) => history.push({type: 'step', payload}),
    () => console.log('FINISHED')
  )
}

const go = (history, payload) => {
  history.go(payload)
}

const replay = (history, payload) => {
  let i = 0
  history.go(i++)

  const interval = setInterval(() => {
    if (i === history.length) {
      return clearInterval(interval)
    }

    history.go(i++)
  }, 1000 / 60)
}

const view = ({ current }, history) => (
  ['main', [
    ['button', {click: replay}, 'Replay'],
    0,
    ['input', {
      style: {width: 100 + history.length},
      input: [go, value],
      type: 'range',
      min: 0,
      value: history.present,
      max: history.length,
      step: 1
    }],
    history.length,
    ['br'],
    ['center', history.present],

    ['div', {
      click: [start, positionsImmediate],
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
      // say current is 0, 0, and dest is 100, 0
      // and step is 5
      const [x, y] = state.previous
      const [x2, y2] = state.dest
      const diffX = (x2 - x)
      const diffY = (y2 - y)
      return { ...state, current: [x + (payload * diffX), y + (payload * diffY)] }
    default:
      return state
  }
}

main(view, {
  model: { dest: [0, 0], current: [0, 0] },
  reducer
})
