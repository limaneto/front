window.easyInvest.utils =
(function () {
  this.router = () => {
    let page = window.location.hash.slice(1)
    let pages = window.easyInvest.views
    if (page === '') {
      pages.registerUser.init()
    } else if (!Object.keys(pages).find((pageUrl) => pageUrl === page)) {
      document.getElementById('container').innerHTML = window.easyInvest.views['404']()
    } else {
      let urlAndQueryString = page.split('?')
      page = urlAndQueryString[0];
      if (urlAndQueryString.length > 1) {
        let queryString = getParams(urlAndQueryString[1])
        pages[page].init(queryString)
      } else {
        pages[page].init()
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

  this.verifyRegisterForm = (e) => {
    let input = e.target
    let inputName = e.target.getAttribute('id')

    if (inputName === 'name-input' && input.value.length > 0 && input.value.length < 3) {
      if (input.getAttribute('class') !== 'error') {
        this.appendErrorMessageToElement(input, 'Name needs more than 3 letters.')
      }
    } else if (inputName === 'cpf-input' && input.value.length > 0 && input.value.length !== 11) {
      if (input.getAttribute('class') !== 'error') {
        this.appendErrorMessageToElement(input, 'CPF can only contain 11 digits.')
      }
    } else if (inputName === 'phone-input' && input.value.length > 0 && !(/^\d+$/.test(input.value))) {
      if (input.getAttribute('class') !== 'error') {
        this.appendErrorMessageToElement(input, 'Invalid phone number.')
      }
    } else if (inputName === 'email-input' && input.value.length > 0 && !this.validateEmail(input.value)) {
      if (input.getAttribute('class') !== 'error') {
        this.appendErrorMessageToElement(input, 'Invalid email.')
      }
    } else if (input.getAttribute('class') === 'error') {
      input.classList.remove('error')
      input.parentNode.lastElementChild.remove()
    }
  }

  this.appendErrorMessageToElement = (element, message) => {
    let errorTemplate = window.easyInvest.templates.validationError(message)
    element.parentNode.insertAdjacentHTML('beforeend', errorTemplate)
    element.classList.add('error')
    element.parentNode.lastElementChild.classList.add('error')
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
      if (element.id && element.id === 'label-up') {
        element.removeAttribute('id')
      }
    }
    window.easyInvest.utils.verifyRegisterForm(e)
  }

  return {
    router, getParams, verifyRegisterForm, inputLostFocus
  }
})()