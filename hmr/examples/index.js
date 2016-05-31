import main from '../../hmr'
import pipe from '@act/main/signals/pipe'

import view from './view'
import reducer from './reducer'
import presenter from './presenter'
import model from './model'

main(pipe(presenter, view), { model, reducer, module })
