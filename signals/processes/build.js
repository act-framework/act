import curry from 'ramda/src/curry'

export default curry((builder, handler, eventSource, next) => {
  return eventSource((value) => builder(handler, next, value))
})
