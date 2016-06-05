import main from '../..'
import { spring } from '../../subscriptions/animation'
import AnimationHistory from '../../internals/AnimationHistory'
import times from 'ramda/src/times'
import map from 'ramda/src/map'

const styles = {
  width: 10,
  height: 10,
  background: 'red',
  position: 'absolute',
  'border-radius': '10px'
}

const particles = times(() => [
  Math.random() * window.innerWidth,
  Math.random() * window.innerWidth,
  Math.random() * window.innerHeight,
  Math.random() * window.innerHeight
], 20)

const view = (val) => (
  ['main', [
    ...map(([x, x2, y, y2]) =>
      ['div', {style: {...styles,
        left: x + (x2 - x) * val / 100,
        top: y + (y2 - y) * val / 100}}]
    , particles)
  ]]
)

const subscriptions = { anim: spring() }

main(view, {
  historyClass: AnimationHistory,
  subscriptions
})
