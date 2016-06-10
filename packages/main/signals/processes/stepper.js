/*
 * `stepper` remembers the last value in a process and returns a function so
 * you can get it. Ideally, you will do that by using `spanshot`.
 *
 */

export default (initial, eventSource) => {
  let valueAtLastStep = initial

  eventSource((value) => {
    valueAtLastStep = value
  })

  return () => valueAtLastStep
}
