import * as utils from '../utils/utils'
import * as db from '../utils/db'
import * as models from '../models'
import * as templates from '../templates'

let RegisterUser = function () {
  this.render = () => {
    let registerFormView = templates.registerForm()
    let footerRegisterFormTemplate = templates.footerRegister()
    document.getElementById('container').innerHTML = registerFormView
    document.getElementsByTagName('FOOTER')[0].innerHTML = footerRegisterFormTemplate;

    this.registerEventListener()
  }

  this.registerUser = e => {
    e.preventDefault();
    document.querySelector('form > footer').style.pointerEvents = 'none'

    utils.showSpinner()

    // I am using set time out here so we can see the button spinner in action
    setTimeout(function () {
      let name = document.getElementById('name-input').value.trim()
      let cpf = document.getElementById('cpf-input').value.trim()
      let phone = document.getElementById('phone-input').value.trim()
      let email = document.getElementById('email-input').value.trim()

      let user = new models.User(name, cpf, phone, email)
      db.saveUser(user)
    }, 4000)
  }

  this.registerEventListener = () => {
    document['user-register'].addEventListener('submit', this.registerUser)
    document.getElementsByTagName('form')[0].addEventListener('blur', utils.inputLostFocus, true)
  }
}

let init = () => {
  let registerUser = new RegisterUser()
  registerUser.render()
}

export { init }