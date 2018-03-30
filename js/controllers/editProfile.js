(function () {

  let render = function (params) {
    params = params || {}
    let user = window.easyInvest.db.getUserByEmail(params.email);
    let editProfileFormView = window.templates.registerFormTemplate(user)
    let footerEditProfileTemplate = window.templates.footerEditProfileTemplate()

    document.getElementById('container').innerHTML = editProfileFormView
    document.getElementsByTagName('FOOTER')[0].innerHTML = footerEditProfileTemplate;

    fillForm(user)

    registerEventListener()
  }


  let fillForm = function (user) {
    document.getElementById('name-input').value = user.name
    document.getElementById('cpf-input').value = user.cpf
    document.getElementById('phone-input').value = user.phone
    document.getElementById('email-input').value = user.email
  }

  let getData = function () {
    let name = document.getElementById('name-input').value.trim()
    let cpf = document.getElementById('cpf-input').value.trim()
    let phone = document.getElementById('phone-input').value.trim()
    let email = document.getElementById('email-input').value.trim()

    return { name, cpf, phone, email }
  }

  let editUser = function (e) {
    e.preventDefault();

    let formData = getData()
    let user = new window.easyInvest.models.User(formData.name, formData.cpf, formData.phone, formData.email)
    window.easyInvest.db.editUser(user)

    window.location.hash = 'usersList'
  }

  let removeUser = function (e) {
    e.preventDefault()

    let formData = getData()
    let user = new window.easyInvest.models.User(formData.name, formData.cpf, formData.phone, formData.email)
    window.easyInvest.db.removeUser(user)
    window.location.hash = 'usersList'
  }

  function registerEventListener () {
    document['user-register'].addEventListener('submit', editUser)
    document.querySelector('footer button#edit').addEventListener('click', editUser)
    document.querySelector('footer button#delete').addEventListener('click', removeUser)
  }

  window.views = window.views || {}
  window.views.editProfile = { render }
})()