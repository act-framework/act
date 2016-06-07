import fromAnimationFrame from '@act/main/signals/sources/fromAnimationFrame'
import random from '@act/main/processes/random'

const frame = fromAnimationFrame().start()

export const tick = random(frame)
