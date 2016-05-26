import main from '../..'
import { positions } from '../../subscriptions/mouse'

const view = (pos) =>
  ['div', `Position: ${pos}`]

const subscriptions = { positions }

main(view, { model: [0, 0], subscriptions })
