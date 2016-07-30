import go from '../helpers/go'
import value from '@act/main/processes/value'

const historySlider = (history) =>
  ['div', [
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
    history.present
  ]]

export default historySlider
