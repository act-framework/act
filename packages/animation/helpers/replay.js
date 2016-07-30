let interval

const replay = (payload, history) => {
  let i = 0
  history.go(i++)

  interval && clearInterval(interval)
  interval = setInterval(() => {
    if (i === history.length) return clearInterval(interval)
    history.go(i++)
  }, 1000 / 60)
}

export default replay
