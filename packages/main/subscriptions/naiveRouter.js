import fromEvent from '../signals/sources/fromEvent'
import hash from '../processes/hash'

const hashChange = hash(fromEvent(window, 'hashchange').start(true))

const naiveRouter = hash(hashChange)

export default naiveRouter
