import main from '@act/hmr'
import pipe from 'main/signals/pipe'

import view from './view'
import reducer from './reducer'
import presenter from './presenter'
import model from './model'

main(pipe(presenter, view), { model, reducer, module })
