import mapObjIndexed from 'ramda/src/mapObjIndexed'
import pipe from '../signals/pipe'
import always from '../signals/processes/always'
import fromEvent from '../signals/sources/fromEvent'

class SignalHandler {
  constructor (events, history, namespaces = []) {
    this.events = events
    this.history = history
    this.namespaces = namespaces
    this.processes = {}
    this.sources = {}
  }

  hook (node, propertyName) {
    const prop = propertyName.split('-')[0]

    mapObjIndexed((processOrValue, type) => {
      if (typeof processOrValue === 'function') {
        this.processes[type] = processOrValue
      } else {
        // TODO we need a nice way to name lambdas to debug properly :/
        // const a = pipe(always(processOrValue))
        // a.cname = 'foooo'

        this.processes[type] = pipe(always(processOrValue))
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
        this.history.push({ type: [...this.namespaces, type].join('.'), payload })
      })
    }, this.events)

    // TODO: Think of a better struct for _this_ for better debugging
    // cause now it's sources[type], processes[type] ...
    // It may be better to have type.sources, type.processes ...
    node['__act'] = {
      [prop]: this
    }
  }
}

export default (...args) => new SignalHandler(...args)
