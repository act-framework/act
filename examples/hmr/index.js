import main from '../../packages/hmr'
import pipe from 'ramda/src/pipe'

import view from './view'
import reducer from './reducer'
import presenter from './presenter'
import model from './model'

main(pipe(presenter, view), { model, reducer, module })
