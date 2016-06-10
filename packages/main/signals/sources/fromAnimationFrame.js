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

      const frame = () => {
        this.id = requestAnimationFrame(frame)
        next()
      }
      frame()
    }
  }

  stop () {
    this.stopped = true
    cancelAnimationFrame(this.id)
    this.id = undefined
  }
}

export default () => new FromAnimationFrame()
