import main from 'main'
import { html } from 'main/processes/clipboard'
import './styles.css'

const view = (model) => (
  ['main', [
    ['div', 'Copy this text and paste inside the textarea. You should see the original HTML.'],
    ['textarea', {
      paste: { paste: html },
      value: model
    }]
  ]]
)

const reducer = (_, { payload }) => `${payload}\n\nTold ya!`

main(view, { model: '', reducer })
