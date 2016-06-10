import Spring from './Spring'

export default class SpringWithVelocity extends Spring {
  step () {
    const target = this.current
    const before = {
      x: target - this.end,
      velocity: this.velocity,
      tension: this.tension,
      friction: this.friction
    }

    let { velocity, x } = integrate(before, this.speed)
    this.current = this.end + x

    if (Math.abs(velocity) < this.tolerance) {
      this.moving = false
      velocity = 0
      this.current = this.end
    }

    this.velocity = velocity
    return [this.current, this.velocity]
  }
}

