const about = () =>
  ['div', { class: css.about }, [
    ['p', 'This example tries to show many features together:'],
    ['ul', [
      ['li', 'springs'],
      ['li', 'time traveling / replaying'],
      ['li', 'style manipulation in JS']
    ]],
    ['p', "It also tries to follow Disney's 12 principles of animation:"],
    ['ul', [
      ['li', 'it squashes and streches the ball when moving, depending on speed'],
      ['li', "there's slow in and slow out, natural to springs"],
      ['li', 'it adds some blur depending on the speed']
    ]],
    ['p', [
      'Take a look: ',
      ['a', { href: 'the12principles.tumblr.com' }, 'http://the12principles.tumblr.com']
    ]],
    ['p', `To accomplish all this together in plain HTML, of course performance is
      compromised. In real life, you will probably use the regular
      AnimationHistory, and this will improve things a lot. Blur is also costly,
      but I'm not sure how to achieve the same look & feel with something else.`]
  ]]

export default about
