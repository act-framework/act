import main from '../..'
import { positions } from '../../subscriptions/window'

const view = (pos) =>
  ['div', `Position: ${pos}`]

const subscriptions = { positions }

main(view, { model: [0, 0], subscriptions })
