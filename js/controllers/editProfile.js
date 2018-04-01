window.easyInvest.views = window.easyInvest.views || {}
window.easyInvest.views.editProfile =
(() => {
  let EditProfile = function (params) {
    this.render = () => {
    params = params || {}
    params.email = params.email || {}
    params.user = window.easyInvest.db.getUserByEmail(params.email);
    let editProfileFormView = window.templates.registerFormTemplate(params.user)
    let footerEditProfileTemplate = window.templates.footerEditProfileTemplate()

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
      let user = new window.easyInvest.models.User(formData.name, formData.cpf, formData.phone, formData.email)
      window.easyInvest.db.editUser(params.user, user)

      window.location.hash = 'usersList'
    }

    this.removeUser = (e) => {
      e.preventDefault()
      window.easyInvest.db.removeUser(params.user)
      window.location.hash = 'usersList'
    }

    this.registerEventListener = () => {
      document['user-register'].addEventListener('submit', this.editUser)
      document.getElementsByTagName('form')[0].addEventListener('blur', window.easyInvest.utils.inputLostFocus, true)
      document.querySelector('footer button#edit').addEventListener('click', this.editUser)
      document.querySelector('footer button#delete').addEventListener('click', this.removeUser)
    }
  }

  return {
    init: function (params) {
      let editProfile = new EditProfile(params)
      editProfile.render()
    }
  }
})()