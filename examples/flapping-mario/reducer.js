import map from 'ramda/src/map'
import any from 'ramda/src/any'
import filter from 'ramda/src/filter'

const width = window.innerWidth
const height = window.innerHeight

const overlap = (a) => (b) =>
  !(((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width) < b.x) ||
    (a.x > (b.x + b.width)))

const mario = {
  x: width * 0.4 - 62,
  width: 62,
  height: 52
}

const pipe = {
  x: width, // starts from the rightmost point
  width: 64,
  height: 500
}

const initialState = {
  status: 'home', // home, playing, gameOver
  pipes: [],
  tick: 0,
  speed: 0,
  y: 0,
  score: 0
}

const pipeHeights = [400, 350, 300, 250, 200, 100]

const passed = (pipe) =>
  ~~pipe.x === ~~mario.x - pipe.width

const reducer = (state = initialState, { type, payload }) => {
  if (state.status === 'gameOver') return state

  switch (type) {
    case 'start':
      return { ...state, status: 'playing' }

    case 'tick':
      let { status, tick, pipes, y, score, speed } = state

      // move mario
      y -= speed

      // hit the ground
      if (y > height - 85) return { ...state, status: 'gameOver' }

      // distance between 2 pipes, smaller on higher score
      const distance = 160 / (score + 1)
      const r = pipeHeights[~~(payload * 6)]

      // adds pipe every 5s
      if (tick % (60 * 2.5) === 0) {
        pipes = pipes.concat([
          {...pipe, type: 'bottom', y: height - r + distance},
          {...pipe, type: 'top', y: -r - distance}
        ])
      }
      tick++

      // move pipes
      pipes = map((pipe) => ({...pipe, x: pipe.x - 2}), pipes)

      // hit a pipe
      if (any(overlap({...mario, y}), pipes)) return { ...state, status: 'gameOver' }

      // scores if passes pipes
      const scored = any(passed, pipes)

      if (scored) {
        score++
      }

      pipes = filter((pipe) => pipe.x > -pipe.width, pipes)
      speed -= 0.1

      return { status, score, pipes, tick, speed, y }

    case 'fly':
      return { ...state, speed: 5 }

    default:
      return state
  }
}

export default reducer
