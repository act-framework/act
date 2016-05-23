import { spy } from 'sinon'

let callIndex = 0
const historySpy = { push: spy() }

export default (event, mockEvent) => (el) => {
  const mockNode = {
    addEventListener (_, fn) {
      fn(mockEvent)
    }
  }

  el.properties[`${event}-handler`].hook(mockNode, `${event}-handler`)
  if (historySpy.push.getCall(callIndex)) {
    const args = historySpy.push.getCall(callIndex).args
    callIndex++
    return {type: args[0], payload: args[1]}
  }
}
