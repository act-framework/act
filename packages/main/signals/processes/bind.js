import build from './build'

export default build((handler, next, value) => {
  handler(value)(next)
})
