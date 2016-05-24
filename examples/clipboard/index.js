import main from '../..'
import map from 'ramda/src/map'

const copy = (history) =>
  history.push({ type: 'copy' })

const cut = (history) =>
  history.push({ type: 'cut' })

const paste = (history, event) =>
  history.push({ type: 'paste', payload: event.clipboardData.getData('text/plain') })

const view = (model) => (
  ['main', [
    ['div', 'Copy, cut & paste inside the textarea to see the state'],
    ['textarea', { copy, cut, paste }, 'Initial value'],
    ...map((action) => ['div', JSON.stringify(action)], model)
  ]]
)

const reducer = (state, action) =>
  [ ...state, action ]

main(view, { model: [], reducer })
