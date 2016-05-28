import main from '../..'
import { position, positionThrottled } from '../../subscriptions/mouse'

const view = (model) =>
  ['div', `Position: ${model.position} Throttled: ${model.positionThrottled}`]

const subscriptions = {
  position,
  positionThrottled
}

const initialState = { position: [0, 0], positionThrottled: [0, 0] }
const reducer = (state = initialState, { type, payload }) => (
  { ...state, [type]: payload }
)

main(view, { subscriptions, reducer })
