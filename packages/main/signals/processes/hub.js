export default () => (eventStream) => {
  const nexts = []
  let isStarted = false

  return (next) => {
    nexts.push(next)
    if (!isStarted) {
      eventStream((value) => {
        nexts.forEach((next) => next(value))
      })
      isStarted = true
    }
  }
}
