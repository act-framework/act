/* globals cancelAnimationFrame requestAnimationFrame */

class FromAnimationFrame {
  constructor () {
    this.stopped = false
    this.id = undefined
  }

  start () {
    return (next) => {
      if (this.stopped) {
        return
      }

      this.next = next
      this.id = requestAnimationFrame(this.next)
    }
  }

  stop () {
    this.stopped = true
    cancelAnimationFrame(this.id)
    this.id = undefined
  }
}


export default () => new FromAnimationFrame()

