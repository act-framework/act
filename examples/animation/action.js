import main from '../..'
import { history, spring } from '../../animation'
import times from 'ramda/src/times'
import map from 'ramda/src/map'
import styles from './styles.css'

let currentSpring
const start = (history, ev) => {
  currentSpring && currentSpring.stop()

  currentSpring = spring({})(
    (payload) => history.push({type: 'anim', payload}),
    () => console.log('FINISHED')
  )
}

const particles = times(() => [
  Math.random() * window.innerWidth,
  Math.random() * window.innerWidth,
  Math.random() * window.innerHeight,
  Math.random() * window.innerHeight
], 20)

const view = (val) => (
  ['main', [
    ['button', {click: start}, 'Start'],
    ...map(([x, x2, y, y2]) =>
      ['div', {class: [styles, 'dot'], style: {
        left: x + (x2 - x) * val / 100,
        top: y + (y2 - y) * val / 100}}]
    , particles)
  ]]
)

main(view, {
  model: 0,
  historyClass: history
})
