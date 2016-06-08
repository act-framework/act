import sprites from './sprites'
import times from 'ramda/src/times'
import unnest from 'ramda/src/unnest'
import map from 'ramda/src/map'
import css from './styles.css'

const tile = 896 / 2

const view = ({ score, status, tick, y, speed, pipes }, history) => (
  ['main', {class: (status !== 'playing') && css.blur}, [
    ...unnest(background(tick)),
    ...map(pipe, pipes),
    mario(speed, y, tick),
    (status === 'home' && home) || (status === 'gameOver' && gameOver),
    displayScore(score)
  ]]
)

const background = (tick) => {
  return times((index) => {
    const basePosition = index * tile
    const style = [
      (-tick * 2) % tile + basePosition,
      (-tick / 2) % tile + basePosition,
      (-tick / 8) % tile + basePosition
    ]

    return ([
      ['img', {style: {left: style[2]}, class: css.mountains, src: sprites.mountains}],
      ['img', {style: {left: style[1]}, class: css.valleys, src: sprites.valleys}],
      ['img', {style: {left: style[0]}, class: css.floor, src: sprites.floor}]
    ])
  }, 3)
}

const pipe = (pipe) =>
  ['img', { style: {left: pipe.x, top: pipe.y}, class: css.pipe, src: sprites.pipe[pipe.type] }]

const mario = (speed, y, tick) =>
  ['img', {
    src: sprites.mario[~~(tick / 5) % 4],
    class: css.mario,
    style: {
      top: y,
      transform: `translate(-100%) rotate(${-speed * Math.PI}deg)`
    }
  }]

const displayScore = (score) =>
  ['div', {class: css.score}, score]

const gameOver = () =>
  ['div', {class: css.gameOver}]

const home = () =>
  ['div', { class: css.home }, [
    ['img', { src: sprites.home }],
    ['h1', 'Act Flapping Mario'],
    ['p', [
      'Do you know flapping bird? So you know flapping Mario.',
      ['br'],
      'Press ',
      ['em', 'enter'],
      ' to start and, ',
      ['em', 'space'],
      ' to fly, or just tap if you are in a mobile device.'
    ]]
  ]]

export default view
