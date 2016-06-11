import { view, model, reducer } from './todo'
import storage from 'main/storages/localStorage'
import main from 'main'

main(view, { model, reducer, storage })
