window.easyInvest.views = window.easyInvest.views || {}
window.easyInvest.views.registerUser =
(() => {
  let RegisterUser = function () {
      this.render = () => {
        let registerFormView = window.templates.registerFormTemplate()
        let footerRegisterFormTemplate = window.templates.footerRegisterFormTemplate()
        document.getElementById('container').innerHTML = registerFormView
        document.getElementsByTagName('FOOTER')[0].innerHTML = footerRegisterFormTemplate;

        this.registerEventListener()
      }

      this.registerUser = e => {
        e.preventDefault();
        document.querySelector('form > footer').style.pointerEvents = 'none'

        window.easyInvest.utils.showSpinner()


        // I am using set time out here so we can see the button spinner in action
        setTimeout(function () {
          let name = document.getElementById('name-input').value.trim()
          let cpf = document.getElementById('cpf-input').value.trim()
          let phone = document.getElementById('phone-input').value.trim()
          let email = document.getElementById('email-input').value.trim()

          let user = new window.easyInvest.models.User(name, cpf, phone, email)
          window.easyInvest.db.saveUser(user)
        }, 4000)
      }

      this.registerEventListener = () => {
        document['user-register'].addEventListener('submit', this.registerUser)
        document.getElementsByTagName('form')[0].addEventListener('blur', window.easyInvest.utils.inputLostFocus, true)
      }
  }

  return {
    init: function () {
      let registerUser = new RegisterUser()
      registerUser.render()
    }
  }
})()