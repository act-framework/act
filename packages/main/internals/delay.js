/* globals cancelAnimationFrame requestAnimationFrame */
let animationFrameId

const delay = (fn) => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(fn)
}

export default typeof window === 'undefined'
  ? (fn) => fn()
  : delay
