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

// TODO: check if localStorage is unique by tab/domain
// else would have to improve storage key

/**
 * Gets the currently stored JSON
 *
 * @returns {json}
 */
const get = () =>
  JSON.parse(window.localStorage.getItem('__act'))

/**
 * Sets the stored JSON
 *
 * @params {json} json
 */
const set = (json) =>
  window.localStorage.setItem('__act', JSON.stringify(json))

export default { get, set }
