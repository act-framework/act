/*
 * `snapshot` allows you to get a value from a signal at any point in time
 * assuming you used `stepper` to get a function that does that.
 *
 */

export default (behavior) =>
  typeof behavior === 'function'
    ? behavior()
    : behavior
