import main from '../..'
import map from 'ramda/src/map'
import clipboard from '../../processes/clipboard'

const copy = (history) =>
  history.push({ type: 'copy' })

const cut = (history) =>
  history.push({ type: 'cut' })

const view = (model) => (
  ['main', [
    ['div', 'Copy, cut & paste inside the textarea to see the state'],
    ['textarea', { copy, cut, paste: {paste: clipboard.text} }, 'Initial value'],
    ...map((action) => ['div', JSON.stringify(action)], model)
  ]]
)

const reducer = (state, action) =>
  [ ...state, action ]

main(view, { model: [], reducer })
