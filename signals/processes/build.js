import curry from 'ramda/src/curry'

export default curry((builder, handler, eventSource, next) => {
  eventSource((value) => builder(handler, next, value))
})
