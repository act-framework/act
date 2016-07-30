import main from 'animation'
import spring from 'animation/spring'
import css from './styles.css'
import value from 'main/processes/value'
import position from 'main/processes/position'
import TraversableAnimationHistory from 'animation/internals/TraversableAnimationHistory'

let currentSpring
const start = (payload, history) => {
  history.push({ type: 'dest', payload })
  currentSpring && currentSpring.stop()

  currentSpring = spring(
    (payload) => history.push({ type: 'step', payload }),
    () => history.push({type: 'finish'})
  )
}

const go = (payload, history) =>
  history.go(payload)

let interval
const replay = (payload, history) => {
  let i = 0
  history.go(i++)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === history.length) return clearInterval(interval)
    history.go(i++)
  }, 1000 / 60)
}

const rewind = (payload, history) => {
  let i = history.length
  history.go(i--)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === 0) return clearInterval(interval)
    history.go(i--)
  }, 1000 / 60)
}

const view = ({ showAbout, distance, current, angle }, history) => (
  ['main', [
    ['button', {click: replay}, '▶ replay'],
    ['button', {click: rewind}, '◀ Rewind'],
    ['a', { href: '#', click: 'toggleAbout' }, 'About ▾'],
    showAbout && about,
    ['br'],
    0,
    ['input', {
      style: {width: Math.min(100 + history.length / 2, window.innerWidth - 100)},
      input: [go, value],
      type: 'range',
      min: 0,
      value: String(history.present),
      max: history.length,
      step: 1
    }],
    history.length,
    ['br'],
    history.present,
    ['div', { class: css.box, click: [start, position] }, 'click in the box'],
    ['div', { class: css.dot, style: {
      transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg)`,
      width: 20 + (distance / 6),
      height: 20 - (distance / 40),
      left: current[0],
      top: current[1],
      '-webkit-filter': `blur(${distance / 200}px)`
    }}]
  ]]
)

const about = () =>
  ['div', { class: css.about }, [
    ['p', 'This example tries to show many features together:'],
    ['ul', [
      ['li', 'springs'],
      ['li', 'time traveling / replaying'],
      ['li', 'style manipulation in JS']
    ]],
    ['p', "It also tries to follow Disney's 12 principles of animation:"],
    ['ul', [
      ['li', 'it squashes and streches the ball when moving, depending on speed'],
      ['li', "there's slow in and slow out, natural to springs"],
      ['li', 'it adds some blur depending on the speed']
    ]],
    ['p', [
      'Take a look: ',
      ['a', { href: 'the12principles.tumblr.com' }, 'http://the12principles.tumblr.com']
    ]],
    ['p', `To accomplish all this together in plain HTML, of course performance is
      compromised. In real life, you will probably use the regular
      AnimationHistory, and this will improve things a lot. Blur is also costly,
      but I'm not sure how to achieve the same look & feel with something else.`]
  ]]

const reducer = (state = { showAbout: false, distance: 0, angle: 0, dest: [0, 0], current: [window.innerWidth / 2 - 100, 395] }, { type, payload }) => {
  switch (type) {
    case 'dest':
      return { ...state, showAbout: false, dest: payload, previous: state.current }

    case 'step':
      const { previous: [x, y], dest: [x2, y2] } = state
      const angle = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI

      const currentX = x + (payload * (x2 - x))
      const currentY = y + (payload * (y2 - y))
      const distance = Math.sqrt(Math.pow(y2 - currentY, 2) + Math.pow(x2 - currentX, 2))

      return { ...state, distance, angle, current: [currentX, currentY] }

    case 'toggleAbout':
      return { ...state, showAbout: !state.showAbout }

    case 'finish':
      return { ...state, angle: 0 }

    default:
      return state
  }
}

main(view, { reducer, historyClass: TraversableAnimationHistory })
