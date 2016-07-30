/**
 * Act Flapping Mario
 *
 * Features:
 *   - uses tick subscription for main loop
 *   - uses History's togglePause
 *   - removes elements (pipes) when they are out of screen
 *   - import images with url-loader
 *
 */

import main from 'animation'
import reducer from './reducer'
import view from './view'
import subscriptions from './subscriptions'

main(view, { reducer, subscriptions })
