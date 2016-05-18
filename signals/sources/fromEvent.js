class FromEvent {
  constructor (node, event, useCapture) {
    this.node = node
    this.event = event
    this.useCapture = useCapture
    this.stopped = false
  }

  start () {
    return (next) => {
      if (this.stopped) {
        return
      }

      this.next = next
      this.node.addEventListener(this.event, this.next, !!this.useCapture)
    }
  }

  stop () {
    this.stopped = true
    this.node.removeEventListener(this.event, this.next, !!this.useCapture)
  }
}

export default (...args) => new FromEvent(...args)
