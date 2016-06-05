import main from '../'
import map from 'ramda/src/map'
import naiveSerialize from '@act/main/processes/naiveSerialize'
import css from './styles.css'

const addComment = ({ comment }, history) => {
  history.push({ type: 'success', payload: comment }, (rollback) => {
    setTimeout(() => {
      rollback()
      history.push({ type: 'failure', payload: 'Ooops, could not save comment... :/' }, (rollback) => {
        setTimeout(() => {
          rollback()
          history.push({ type: 'success', payload: comment })
          history.push({ type: 'apology', payload: "No, wait, actually... it worked! I'm confused!" })
        }, 5000)
      })
    }, 5000)
  })
}

const view = (model) => (
  ['form', { submit: [addComment, naiveSerialize] }, [
    ['p', `
      This example shows how to do optimitic updates using Act. It actually goes
      one step further by rolling back the error itself. That's not a common use
      case, of course, but it's just to show what it can do. So type and submit 5
      values quickly and wait.
    `],
    ['input', { autocomplete: 'off', name: 'comment', value: '' }],
    ['button', 'Add comment'],
    ['hr'],
    model.apology && ['div', { class: css.apology }, model.apology],
    model.error && ['div', { class: css.error }, model.error],
    ...map(comment, model.comments)
  ]]
)

const comment = (comment) => (
  ['div', comment]
)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'success':
      return { ...state, comments: [...state.comments, payload] }
    case 'failure':
      return { ...state, error: payload, apology: false }
    case 'apology':
      return { ...state, apology: payload, error: false }
    default:
      return state
  }
}

const model = { comments: [], error: false, apology: false }

main(view, { model, reducer })
