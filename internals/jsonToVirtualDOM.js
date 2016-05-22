import h from 'virtual-dom/h'
import isArrayLike from 'ramda/src/isArrayLike'
import map from 'ramda/src/map'
import classLists from 'class-lists'
import eventHandler from './eventHandler'
import signalHandler from './signalHandler'

const isAts = (maybeAts) =>
  (typeof maybeAts === 'object') && maybeAts !== null && !isArrayLike(maybeAts)

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
      newChildren = fn()
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

const events = [
  'blur', 'change', 'click', 'input', 'keyup', 'dblclick'
]

function injectEventHandlers (props, history, namespaces) {
  map((event) => {
    if (props[event]) {
      if (typeof props[event] === 'function') {
        props[`${event}-handler`] = eventHandler(props[event], history, namespaces)
      } else {
        props[`${event}-handler`] = signalHandler(props[event], history, namespaces)
      }
    }
  }, events)
}

const jsonToVirtualDOM = (json, history, namespaces) => {
  if (typeof json === 'string') {
    return jsonToVirtualDOM(['span', json], history)
  }

  const [tag, maybeAtsOrChildren, maybeChildren] = json
  let ats = {}
  let children = []

  if (typeof maybeAtsOrChildren !== 'undefined') {
    isAts(maybeAtsOrChildren)
      ? ats = maybeAtsOrChildren
      : children = maybeAtsOrChildren
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
      children = map((el) => processChildren(el, history, tag, children, namespaces), children())
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
  } else if (children === false) {
    children = undefined
  }

  injectEventHandlers(ats, history, namespaces)

  if (ats['class']) {
    ats['class'] = classLists(...ats['class'])
  }

  return h(tag, attributeToProperty(ats), children)
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

function attributeToProperty (attrs) {
  for (var attr in attrs) {
    if (attr in transform) {
      attrs[transform[attr]] = attrs[attr]
      delete attrs[attr]
    }
  }
  return attrs
}

export default jsonToVirtualDOM
