import _ from 'lodash'
import './style.css'
import printMe from './print.js'
// import { cube } from './math.js'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
} else {
  console.log('Looks like in production')
}

function component () {
  let element = document.createElement('div')
  const btn = document.createElement('button')
  const br = document.createElement('br')

  btn.innerHTML = 'Click me and look at the console!'
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.appendChild(br)
  element.appendChild(btn)

  element.classList.add('hello')

  btn.onclick = printMe

  return element
}

document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
  })
}
