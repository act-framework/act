const acceleration = ({tension, x, friction, velocity}) =>
  -tension * x - friction * velocity

function evaluate (state, dt, derivative) {
  let newState = {}

  if (arguments.length === 3) {
    newState.x = state.x + derivative.dx * dt
    newState.velocity = state.velocity + derivative.dv * dt
    newState.tension = state.tension
    newState.friction = state.friction
  } else {
    newState = state
  }

  return { dx: newState.velocity, dv: acceleration(newState) }
}

const integrate = (state, speed) => {
  const a = evaluate(state)
  const b = evaluate(state, speed * 0.5, a)
  const c = evaluate(state, speed * 0.5, b)
  const d = evaluate(state, speed, c)

  const dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx)
  const dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv)

  state.x += dxdt * speed
  state.velocity += dvdt * speed

  return state
}

export default class Spring {
  constructor ({speed = 1 / 60, tension = 80, friction = 8, velocity = 1, tolerance = 0.001} = {}) {
    this.speed = speed
    this.tension = tension
    this.friction = friction
    this.velocity = velocity
    this.tolerance = tolerance
    this.current = 0
    this.end = 1
    this.moving = true
  }

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
    return this.current
  }
}
