/* globals cancelAnimationFrame requestAnimationFrame */
let animationFrameId

// TODO: think on how to use fromAnimationFrame
const delay = (fn) => {
  if (typeof window === 'undefined') {
    return fn()
  }

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(fn)
}

export default delay
