window.easyInvest.utils =
(function () {
  this.router = () => {
    let page = window.location.hash.slice(1)
    if (page === '') {
      window.easyInvest.views.registerUser.init()
    } else {
      let urlAndQueryString = page.split('?')
      page = urlAndQueryString[0];
      if (urlAndQueryString.length > 1) {
        let queryString = getParams(urlAndQueryString[1])
        window.easyInvest.views[page].init(queryString)
      } else {
        window.easyInvest.views[page].init()
      }
    }
  }

  this.getParams = (queryString) => {
    let params = {}
    let paramsArray = queryString.split('&')
    paramsArray.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })

    return params
  }

  this.isRegisterFormValid = () => {
    let nameInput = document.getElementById('name-input')
    let name = nameInput.value.trim()
    let cpfInput = document.getElementById('cpf-input')
    let cpf = cpfInput.value.trim()
    let phoneInput = document.getElementById('phone-input')
    let phone = phoneInput.value.trim()
    let emailInput = document.getElementById('email-input')
    let email = emailInput.value.trim()

    if (name.length < 3) {
      this.appendErrorMessageToElement(nameInput, 'Name needs more than 3 letters.')
      return false;
    } else if (cpf.length !== 11) {
      this.appendErrorMessageToElement(cpfInput, 'CPF can only contain 11 digits.')
      return false;
    } else if (/^\d+$/.test(phone)) {
      this.appendErrorMessageToElement(phoneInput, 'Phone cannot contain letters.')
      return false;
    } else if (this.validateEmail(email)) {
      this.appendErrorMessageToElement(emailInput, 'Invalid email.')
      return false;
    }

    return true;
  }

  this.appendErrorMessageToElement = (element, message) => {
    let errorTemplate = window.easyInvest.templates.validationError(message)
    element.classList.add('error')
    element.parentNode.insertAdjacentHTML('beforeend', errorTemplate)
  }

  this.validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  this.inputLostFocus = (e) => {
    // maintain label animation still user typed
    let element = e.target.nextElementSibling
    if (e.target.value !== '' && window.location.hash !== '#usersList') {
      element.id = "label-up"
    } else {
      if (element.id === 'label-up') {
        element.removeAttribute('id')
      }
    }

    // remove the error span
    if(e.target.value === '' && e.target.getAttribute('class') === 'error') {
      e.target.classList.toggle('error')
      element.nextElementSibling.remove()
    }
  }

  return {
    router, getParams, isRegisterFormValid, inputLostFocus
  }
})()