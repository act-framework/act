import main from '../..'
import count from '../../processes/count'

main((value) => ['button', {click: {add: count}}, value], { model: 0 })
