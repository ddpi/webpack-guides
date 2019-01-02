// import _ from 'lodash'
import './style.css'
import printMe from './print.js'
// import { cube } from './math.js'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
} else {
  console.log('Looks like in production')
}

function getComponent () {

  // const btn = document.createElement('button')

  // Lodash, currently included via a script, is required for this line to work
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    let element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  /*
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
  */
 /*
  element.classList.add('hello')

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe

  element.appendChild(btn)
*/
    return element
  })
}
//let element = component()
getComponent().then( component => {
  document.body.appendChild(component)
})

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}
