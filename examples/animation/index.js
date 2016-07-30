import main from 'animation/traversable'
import css from './styles.css'
import replay from 'animation/helpers/replay'
import rewind from 'animation/helpers/rewind'
import springToPosition from 'animation/helpers/springToPosition'
import historySlider from 'animation/components/historySlider'
import about from './about'

const view = ({ showAbout, distance, current, angle }, history) => (
  ['main', [
    ['button', {click: replay}, '▶ replay'],
    ['button', {click: rewind}, '◀ Rewind'],
    ['a', { href: '#', click: 'toggleAbout' }, 'About ▾'],
    showAbout && about,
    ['br'],
    historySlider(history),
    ['div', { class: css.box, click: springToPosition }, 'click in the box'],
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

main(view, { reducer })
