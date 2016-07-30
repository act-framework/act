/**
 * Stores and loads current state in applications.
 *
 * Only accepts JSON, so beware of simple strings & numbers.
 * Used as an argument to `main`.
 * @example
 *   import localStorage from '@act/core/storages/localStorage'
 *
 *   main(view, { storage: localStorage }
 */

const key = `__act_${location.href}`
/**
 * Gets the currently stored JSON
 *
 * @returns {json}
 */
const get = () =>
  JSON.parse(window.localStorage.getItem(key))

/**
 * Sets the stored JSON
 *
 * @params {json} json
 */
const set = (json) =>
  window.localStorage.setItem(key, JSON.stringify(json))

export default { get, set }
