const view = (namespace, view) => {
  const namespaced = () => view
  namespaced.namespace = String(namespace)
  return namespaced
}

const reducers = (config) => (state, {type, payload}) => {
  const [namespace, ...rest] = type.split('.')
  if (config[namespace]) {
    return {
      ...state,
      [namespace]: config[namespace](state[namespace], {type: rest.join('.'), payload})
    }
  }

  return state
}

export default { view, reducers }
