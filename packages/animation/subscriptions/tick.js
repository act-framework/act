import fromAnimationFrame from '@act/main/signals/sources/fromAnimationFrame'
import random from '@act/main/processes/random'

const frame = fromAnimationFrame().start()

const tick = random(frame)

export default tick
