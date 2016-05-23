import event from './event'
import mapObjIndexed from 'ramda/src/mapObjIndexed'

export const formEvent = (ev) => (el, values) =>
  event(ev, {
    target: mapObjIndexed((value, name, idx) => (
      { value, name }
    ), values)
  })(el)

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
