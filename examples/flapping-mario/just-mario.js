import main from '../..'
import css from './styles.css'
import times from 'ramda/src/times'
import unnest from 'ramda/src/unnest'
import { tick } from '../../subscriptions/animation'
import { onKeyCode } from '../../subscriptions/keyboard'
import sprites from './sprites'

const tile = 896 / 2

const background = (tick) => {
  return times((index) => {
    const basePosition = index * tile
    const style = [
      (-tick) % tile + basePosition,
      (-tick / 4) % tile + basePosition,
      (-tick / 8) % tile + basePosition
    ]

    return ([
      ['img', { style: { left: style[2] }, class: css.mountains, src: sprites.mountains }],
      ['img', { style: { left: style[1] }, class: css.valleys, src: sprites.valleys }],
      ['img', { style: { left: style[0] }, class: css.floor, src: sprites.floor }]
    ])
  }, 3)
}

const view = ({ tick, pos, speed }, history) => (
  ['main', [
    ...unnest(background(tick)),
    ['img', { src: sprites.mario[~~(tick / 5) % 4], class: css.mario, style: {
      top: pos,
      transform: `translate(-100%) rotate(${-speed * Math.PI}deg)`
    } }]
  ]]
)

const reducer = (state = { tick: 0, speed: 0, pos: 0 }, { type, payload }) => {
  switch (type) {
    case 'tick':
      return { ...state, tick: state.tick + 1, speed: state.speed - 0.1, pos: state.pos - state.speed }

    case 'space':
      return { ...state, speed: 5 }

    default:
      return state
  }
}

const keys = { space: 32, enter: 13 }

const subscriptions = [
  ['tick', tick],
  ['space', onKeyCode(keys.space)]
]

main(view, { reducer, subscriptions })
