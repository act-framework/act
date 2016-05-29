import main from '../..'
import map from 'ramda/src/map'
import { text } from '../../processes/clipboard'

const view = (model) => (
  ['main', [
    ['div', 'Copy, cut & paste inside the textarea to see the state'],
    ['textarea', {
      copy: { copy: text },
      cut: { cut: text },
      paste: { paste: text }
    }, 'Initial value'],
    ...map((action) => ['div', JSON.stringify(action)], model)
  ]]
)

const reducer = (state, action) =>
  [ ...state, action ]

main(view, { model: [], reducer })
