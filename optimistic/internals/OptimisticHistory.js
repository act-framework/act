/* globals performance */

import TraversableHistory from '@act/main/internals/TraversableHistory'
import propEq from 'ramda/src/propEq'
import remove from 'ramda/src/remove'
import findIndex from 'ramda/src/findIndex'
import delay from '@act/main/internals/delay'

export default class OptimisticHistory extends TraversableHistory {
  push (action, condition) {
    if (condition) {
      const id = performance.now()
      this.delta.push({ ...action, id })
      condition && condition(() => this.undoById(id))
    } else {
      this.delta.push(action)
    }

    return delay(() => this.concat())
  }

  undoById (id) {
    const index = findIndex(propEq('id', id), this.timeline)
    this.timeline = remove(index, 1, this.timeline)
    this.state = this.reduce(this.initialState, this.timeline)

    // if for some reason I went to the past the present shouldn't be -1, but
    // stay the same
    if (index >= this.present) {
      this.present -= 1
    }

    return this.rerender()
  }
}
