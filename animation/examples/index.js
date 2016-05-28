import main, { spring } from '..'
import styles from './styles.css'
import value from '@act/main/processes/value'
import position from '@act/main/processes/position'
import TraversableAnimationHistory from '../internals/TraversableAnimationHistory'

let currentSpring
const start = (history, payload) => {
  history.push({type: 'dest', payload})
  currentSpring && currentSpring.stop()

  currentSpring = spring(
    (payload) => history.push({type: 'step', payload}),
    () => console.log('FINISHED')
  )
}

const go = (history, payload) => {
  history.go(payload)
}

let interval
const replay = (history, payload) => {
  let i = 0
  history.go(i++)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === history.length) return clearInterval(interval)
    history.go(i++)
  }, 1000 / 60)
}

const rewind = (history, payload) => {
  let i = history.length
  history.go(i--)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === 0) return clearInterval(interval)
    history.go(i--)
  }, 1000 / 60)
}

const view = ({ current }, history) => (
  ['main', [
    ['button', {click: replay}, 'Replay'],
    ['button', {click: rewind}, 'Rewind'],
    ['br'],
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
    history.present,
    ['div', { class: [styles, 'box'], click: [start, position] }, 'click in the box'],
    ['div', { class: [styles, 'dot'], style: { left: current[0], top: current[1] } }]
  ]]
)

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

main(view, { reducer, historyClass: TraversableAnimationHistory })
