const utils = require('./utils/utils')
import './assets/css/main.scss'

window.onload = function () {
  window.addEventListener('hashchange', () => {
    utils.router()
  })
  utils.router()
}