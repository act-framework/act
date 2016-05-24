import main from '../..'
import pngLogo from './logo.png'
import svgLogo from './logo.svg'

main(['main', [
  ['img', { src: pngLogo, width: 100 }],
  ['img', { src: svgLogo, width: 100 }]
]])
