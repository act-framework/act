/*
 * Act test helpers
 *
 * NOTE: this module requires `sinon`
 *
 */

import _main from '../..'
import jsonToVirtualDOM from '../../internals/jsonToVirtualDOM'
import { spy } from 'sinon'

/**
 * A somewhat mocked version of `main` for testing purposes.
 *
 * @param {function|json} view
 * @param {object} config - same as in real `main`
 * @returns {array} - same array as in real `main`
 */
export const main = (view, config) => {
  const insertBefore = spy()
  const node = { insertBefore }

  return _main(view, { node, ...config })
}

export const historySpy = { push: spy() }

/**
 * Converts a JSON to a virtual-dom object
 *
 * @param {json} json
 * @returns {VNode|VTree}
 */
export const toVDOM = (json) => jsonToVirtualDOM(json, historySpy)
