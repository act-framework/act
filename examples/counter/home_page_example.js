import main from '../..'
import { count } from '../../processes'

main((value) => ['button', {click: {add: count}}, value], { model: 0 })
