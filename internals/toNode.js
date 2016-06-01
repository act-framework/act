import isEmpty from 'ramda/src/isEmpty'
import map from 'ramda/src/map'
import flatten from 'ramda/src/flatten'
import VNode from 'virtual-dom/vnode/vnode'
import VText from 'virtual-dom/vnode/vtext'
import isVNode from 'virtual-dom/vnode/is-vnode'
import isVText from 'virtual-dom/vnode/is-vtext'
import isHook from 'virtual-dom/vnode/is-vhook'
import isVThunk from 'virtual-dom/vnode/is-thunk'
import parseTag from 'virtual-dom/virtual-hyperscript/parse-tag'
import softSetHook from 'virtual-dom/virtual-hyperscript/hooks/soft-set-hook'

export default function toNode (tagName, props, children) {
  let key
  let namespace

  const tag = parseTag(tagName, props)

  if (props.hasOwnProperty('key')) {
    key = props.key
    props.key = undefined
  }

  if (props.hasOwnProperty('namespace')) {
    namespace = props.namespace
    props.namespace = undefined
  }

  if (tag === 'INPUT' &&
    !namespace &&
    props.hasOwnProperty('value') &&
    props.value !== undefined &&
    !isHook(props.value)
  ) {
    if (props.value !== null && typeof props.value !== 'string') {
      throw UnsupportedValueType({
        received: typeof props.value,
        Vnode: {
          tagName: tag,
          properties: props
        }
      })
    }
    props.value = softSetHook(props.value)
  }

  const childNodes = map((child) => convertChild(child, tag, props), flatten([children]))

  return new VNode(tag, props, childNodes, key, namespace)
}

const convertChild = (c, tag, props) => {
  if (typeof c === 'string') {
    return new VText(c)
  } else if (c === undefined || c === null) {
    return
  } else if (isChild(c)) {
    return c
  } else {
    throw UnexpectedChildren({
      foreignObject: c,
      parentVnode: {
        tagName: tag,
        properties: props
      }
    })
  }
}

function isChild (x) {
  return isVNode(x) || isVText(x) || isVThunk(x)
}

const UnexpectedChildren = (data) => {
  const err = new Error()

  err.type = 'act.unexpected.children'
  err.message = `Unexpected child in view: ${errorString(data.foreignObject)}. Parent node is: ${errorString(data.parentVnode)}`
  err.foreignObject = data.foreignObject
  err.parentVnode = data.parentVnode

  return err
}

const UnsupportedValueType = (data) => {
  const err = new Error()

  err.type = 'act.unsupported.value-type'
  err.message = `Input value should be a string, but got ${data.received}, in the tag ${errorString(data.Vnode)}.`
  err.Vnode = data.Vnode

  return err
}

const errorString = (obj) => {
  const parts = []

  if (obj.tagName) {
    parts.push(`'${obj.tagName.toLowerCase()}'`)
  }

  if (!isEmpty(obj.properties)) {
    parts.push(JSON.stringify(obj.properties))
  }

  if (!isEmpty(obj.children)) {
    parts.push(JSON.stringify(obj.children))
  }

  return `[${parts.join(', ')}]`
}
