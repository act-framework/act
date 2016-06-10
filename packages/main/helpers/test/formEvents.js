import event from './event'
import map from 'ramda/src/map'
import toPairs from 'ramda/src/toPairs'

export const formEvent = (ev) => (el, values) => {
  const mockEvent = {
    target: map(([name, value]) => ({ value, name }), toPairs(values)),
    preventDefault: () => {}
  }

  return event(ev, mockEvent)(el)
}

/**
 * Calls `reset` of a form
 *
 * @usage
 *   reset(form, { name: 'Morgenbesser' })
 */
export const reset = formEvent('reset')

/**
 * Calls `submit` of a form
 *
 * @usage
 *   submit(form, { name: 'Nagel' })
 */
export const submit = formEvent('submit')
