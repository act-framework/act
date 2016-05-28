import { view, model, reducer } from './todo'
import storage from '../../storages/localStorage'
import main from '../..'

main(view, { model, reducer, storage })
