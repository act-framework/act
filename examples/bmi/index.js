import main from 'main'
import value from 'main/processes/value'
import css from './styles.css'

const view = ({ height, weight }) => {
  const bmi = ~~calcBMI(height, weight)
  const diagnostic = diagnose(bmi)

  return ['div', [
    ['h1', 'Act BMI calculator'],
    `Height: ${height} cm`,
    slider(100, 220, { input: { height: value }, defaultValue: height }),
    `Weight: ${weight} kg`,
    slider(30, 150, { input: { weight: value }, defaultValue: weight }),
    `BMI: ${bmi} `, ['span', { class: css[diagnostic] }, diagnostic],
    slider(10, 50, { readOnly: true, value: String(bmi) })
  ]]
}

const slider = (min, max, attrs) =>
  ['input', { type: 'range', min, max, ...attrs }]

const reducer = (state, { type, payload }) => ({ ...state, [type]: payload })

const diagnose = (bmi) => {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  return 'obese'
}

const calcBMI = (height, weight) => weight / Math.pow(height / 100, 2)

main(view, { model: { height: 180, weight: 80 }, reducer })
