import * as db from '../utils/db'
import * as utils from '../utils/utils'
import * as templates from '../templates'
import * as models from '../models'

let EditProfile = function (params) {
  this.render = () => {
    params = params || {}
    params.email = params.email || {}
    params.user = db.getUserByEmail(params.email);
    let editProfileFormView = templates.registerForm(params.user)
    let footerEditProfileTemplate = templates.footerEditProfile()

    document.getElementById('container').innerHTML = editProfileFormView
    let labels = document.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++) {
      labels[i].setAttribute('id', 'label-up')
    }
    document.getElementsByTagName('FOOTER')[0].innerHTML = footerEditProfileTemplate;

    this.fillForm(params.user)

    this.registerEventListener()
  }

  this.fillForm = (user) => {
    document.getElementById('name-input').value = user.name
    document.getElementById('cpf-input').value = user.cpf
    document.getElementById('phone-input').value = user.phone
    document.getElementById('email-input').value = user.email
  }

  this.getData = () => {
    let name = document.getElementById('name-input').value.trim()
    let cpf = document.getElementById('cpf-input').value.trim()
    let phone = document.getElementById('phone-input').value.trim()
    let email = document.getElementById('email-input').value.trim()

    return {name, cpf, phone, email}
  }

  this.editUser = (e) => {
    e.preventDefault();

    let formData = this.getData()
    let user = new models.User(formData.name, formData.cpf, formData.phone, formData.email)
    db.editUser(params.user, user)

    window.location.hash = 'usersList'
  }

  this.removeUser = (e) => {
    e.preventDefault()
    db.removeUser(params.user)
    window.location.hash = 'usersList'
  }

  this.registerEventListener = () => {
    document['user-register'].addEventListener('submit', this.editUser)
    document.getElementsByTagName('form')[0].addEventListener('blur', utils.inputLostFocus, true)
    document.querySelector('footer button#edit').addEventListener('click', this.editUser)
    document.querySelector('footer button#delete').addEventListener('click', this.removeUser)
  }
}

let init = (params) => {
  let editProfile = new EditProfile(params)
  editProfile.render()
}

export { init }