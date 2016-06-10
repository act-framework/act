import toNode from './toNode'
import isArrayLike from 'ramda/src/isArrayLike'
import map from 'ramda/src/map'
import classLists from 'class-lists'
import signalHandler from './signalHandler'
import events from './events'
import intersection from 'ramda/src/intersection'

const isAttrs = (maybeAttrs) =>
  (typeof maybeAttrs === 'object') && maybeAttrs !== null && !isArrayLike(maybeAttrs)

const processChildren = (el, history, tag, children, namespaces = []) => {
  // To support the case where user does
  // ```
  // condition && ['div', ...]
  // ```
  // and `condition` is false
  if (el === false) {
    return []
  }

  if (isArrayLike(el)) {
    return jsonToVirtualDOM(el, history, namespaces)
  }

  let newChildren
  if (typeof el === 'function') {
    const fn = el
    try {
      newChildren = fn(history.state)
      if (el.namespace) {
        namespaces = [...namespaces, el.namespace]
      }
      return jsonToVirtualDOM(newChildren, history, namespaces)
    } catch (e) {
      const errorMessage = renderErrorMessage(tag, newChildren, e, fn)

//      if (globalErrorHandler) {
//        console.log(errorMessage)
//        console.trace()
//
 //       return jsonToVirtualDOM(globalErrorHandler, history)
 //     } else {
      throw errorMessage
 //     }
    }
  }

  return String(el)
}

const jsonToVirtualDOM = (json, history, namespaces) => {
  if (!isArrayLike(json)) {
    return jsonToVirtualDOM(['span', json], history)
  }

  const [tag, maybeAttrsOrChildren, maybeChildren] = json

  let ats = {}
  let children = []

  if (typeof maybeAttrsOrChildren !== 'undefined') {
    isAttrs(maybeAttrsOrChildren)
      ? ats = maybeAttrsOrChildren
      : children = maybeAttrsOrChildren
  }

  if (typeof maybeChildren !== 'undefined') {
    children = maybeChildren
  }

  if (isArrayLike(children)) {
    children = map((el) => processChildren(el, history, tag, children, namespaces), children)
  } else if (typeof children === 'function') {
    if (children.namespace) {
      console.log('TODO namespace when function is single children')
    }
    const fn = children
    try {
      children = map((el) => processChildren(el, history, tag, children, namespaces), children(history.state))
    } catch (e) {
      const errorMessage = renderErrorMessage(tag, children, e, fn)
      throw errorMessage
//      if (globalErrorHandler) {
//        console.trace()
//        console.log(errorMessage)
 //       children = jsonToVirtualDOM(globalErrorHandler, history, globalErrorHandler)
  //    } else {
    //    throw errorMessage
     // }
    }
  } else if (children === false || children === null) {
    children = undefined
  } else {
    children = String(children)
  }

  if (ats['class'] && typeof ats['class'] !== 'string') {
    ats['class'] = classLists(...ats['class'])
  }
  injectEventHandlers(ats, history, namespaces)
  attrToProp(ats)

  return toNode(tag, ats, children)
}

function attrToProp (ats) {
  const transformableAttrs = intersection(Object.keys(ats), Object.keys(transform))

  map((at) => {
    ats[transform[at]] = ats[at]
    delete ats[at]
  }, transformableAttrs)
}

function injectEventHandlers (ats, history, namespaces) {
  const eventsInAttrs = intersection(Object.keys(ats), events)
  map((event) => {
    ats[`${event}-handler`] = signalHandler(ats[event], history, namespaces)
  }, eventsInAttrs)
}

const renderErrorMessage = (tag, children, e, fn) => {
  const error = e.toString()
  if (error.match(/\[ACT\]/)) {
    return `
${error}

Then the error propagated to:
${_e(tag, children, e, fn)}
`
  } else {
    return _e(tag, children, e, fn)
  }
}

const _e = (tag, children, e, fn) => {
  return `
    [ACT] =========
      There was an error inside '${tag}', when rendering:
      ${fn}
      ---
      Children: ${JSON.stringify(children)}.
      ---
      Error message: ${e.toString()}`
}

// from https://github.com/wayfair/tungstenjs/blob/42535b17e4894e866abf5711be2266458bc4d508/src/template/template_to_vdom.js#L118-L140
var transform = {
  // transformed name
  'class': 'className',
  'for': 'htmlFor'
  // 'http-equiv': 'httpEquiv',
  // case specificity
  // 'accesskey': 'accessKey',
  // 'autocomplete': 'autoComplete',
  // 'autoplay': 'autoPlay',
  // 'colspan': 'colSpan',
  // 'contenteditable': 'contentEditable',
  // 'contextmenu': 'contextMenu',
  // 'enctype': 'encType',
  // 'formnovalidate': 'formNoValidate',
  // 'hreflang': 'hrefLang',
  // 'novalidate': 'noValidate',
  // 'readonly': 'readOnly',
  // 'rowspan': 'rowSpan',
  // 'spellcheck ': 'spellCheck',
  // 'srcdoc': 'srcDoc',
  // 'srcset': 'srcSet',
  // 'tabindex': 'tabIndex'
}

export default jsonToVirtualDOM
