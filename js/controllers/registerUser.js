(function () {
  let render = function () {
    let registerFormView = window.templates.registerFormTemplate()
    let footerRegisterFormTemplate = window.templates.footerRegisterFormTemplate()
    document.getElementById('container').innerHTML = registerFormView
    document.getElementsByTagName('FOOTER')[0].innerHTML = footerRegisterFormTemplate;

    registerEventListener()
  }

  let registerUser = e => {
    e.preventDefault();

    let name = document.getElementById('name-input').value.trim()
    let cpf = document.getElementById('cpf-input').value.trim()
    let phone = document.getElementById('phone-input').value.trim()
    let email = document.getElementById('email-input').value.trim()

    let user = new window.easyInvest.models.User(name, cpf, phone, email)
    window.easyInvest.db.saveUser(user)
  }

  let maintainAnimation = (e) => {
    let element = e.target.nextElementSibling
    if (e.target.value !== '') {
      element.style.margin = '-35px 0px 0px 0px'
      element.style.color = '#333333'
      element.style['font-size'] = '15px'
    }
  }

  let registerEventListener = () => {
    document['user-register'].addEventListener('submit', registerUser)
    document.querySelector('footer > button').addEventListener('click', registerUser)
    document.getElementsByTagName('form')[0].addEventListener('blur', maintainAnimation, true)
  }


  window.views = window.views || {}
  window.views.registerUser = { render }
})()