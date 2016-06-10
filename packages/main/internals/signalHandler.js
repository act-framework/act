import always from '../signals/processes/always'
import fromEvent from '../signals/sources/fromEvent'
import identity from '../signals/processes/identity'
import isArrayLike from 'ramda/src/isArrayLike'
import map from 'ramda/src/map'
import toPairs from 'ramda/src/toPairs'

class SignalHandler {
  constructor (events, history, namespaces = []) {
    if (typeof events === 'function' || typeof events === 'string') {
      this.events = [[events, identity]]
    } else if (isArrayLike(events)) {
      this.events = isArrayLike(events[0]) ? events : [events]
    } else if (typeof events === 'object') {
      this.events = toPairs(events)
    } else {
      this.events = []
    }

    this.history = history
    this.namespaces = namespaces
    this.processes = {}
    this.sources = {}
  }

  hook (node, propertyName) {
    const prop = propertyName.split('-')[0]
    let index = 0
    map(([typeOrAction, processOrValue]) => {
      const [type, action] = typeof typeOrAction === 'string'
        ? [typeOrAction, (payload, history) => this.history.push({ type: [...this.namespaces, type].join('.'), payload })]
        : [`${prop}-${++index}`, typeOrAction]

      if (typeof processOrValue === 'function') {
        this.processes[type] = processOrValue
      } else {
        // TODO we need a nice way to name lambdas to debug properly :/
        // const a = pipe(always(processOrValue))
        // a.cname = 'foooo'

        this.processes[type] = always(processOrValue)
      }

      if (node['__act'] && node['__act'][prop]) {
        if (node['__act'][prop].processes[type] === this.processes[type]) {
          return
        } else {
          node['__act'][prop].sources[type].stop()
        }
      }

      this.sources[type] = fromEvent(node, prop)

      this.processes[type](this.sources[type].start())((payload) => {
        action(payload, this.history)
      })
    }, this.events)

    // TODO: Think of a better struct for _this_ for better debugging
    // cause now it's sources[type], processes[type] ...
    // It may be better to have type.sources, type.processes ...
    node['__act'] = node['__act']
      ? { ...node['__act'], [prop]: this }
      : { [prop]: this }
  }
}

export default (...args) => new SignalHandler(...args)
