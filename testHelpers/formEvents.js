import event from './event'

export const formEvent = (ev) => (el, values) =>
  event(ev, { target: values })

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
