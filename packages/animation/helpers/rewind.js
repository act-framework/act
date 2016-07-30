let interval

const rewind = (payload, history) => {
  let i = history.length
  history.go(i--)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === 0) return clearInterval(interval)
    history.go(i--)
  }, 1000 / 60)
}

export default rewind
