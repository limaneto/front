import * as controllers from '../controllers'
import * as templates from '../templates'

let router = () => {
  let pages = controllers
  let page = window.location.hash.slice(1)
  if (page === '') {
    pages.registerUser.init()
  } else if (!Object.keys(pages).find((pageUrl) => page.indexOf(pageUrl) === -1 )) {
    document.getElementById('container').innerHTML = templates.notFound()
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

let getParams = (queryString) => {
  let params = {}
  let paramsArray = queryString.split('&')
  paramsArray.forEach(item => {
    item = item.split('=')
    params[item[0]] = item[1]
  })

  return params
}

let verifyRegisterForm = (e) => {
  let input = e.target
  let inputName = e.target.getAttribute('id')

  if (inputName === 'name-input' && input.value.length > 0 && input.value.length < 3) {
    if (input.getAttribute('class') !== 'error') {
      appendErrorMessageToElement(input, 'Nome precisa conter mais de 3 letras.')
    }
  } else if (inputName === 'cpf-input' && input.value.length > 0 && input.value.length !== 11) {
    if (input.getAttribute('class') !== 'error') {
      appendErrorMessageToElement(input, 'CPF deve ter 11 digitos.')
    }
  } else if (inputName === 'phone-input' && input.value.length > 0 && !(/^\d+$/.test(input.value))) {
    if (input.getAttribute('class') !== 'error') {
      appendErrorMessageToElement(input, 'Número de telefone inválido.')
    }
  } else if (inputName === 'email-input' && input.value.length > 0 && !validateEmail(input.value)) {
    if (input.getAttribute('class') !== 'error') {
      appendErrorMessageToElement(input, 'Email inválido.')
    }
  } else if (input.getAttribute('class') === 'error') {
    input.classList.remove('error')
    input.parentNode.lastElementChild.remove()
  }

  if (document.querySelectorAll('footer button')) {
    for(let i = 0; i < document.querySelectorAll('footer button').length; i++) {
      document.querySelectorAll('footer button')[i].disabled = !shouldEnableButton()
    }
  }
}

let shouldEnableButton = () => {
  return document.getElementById('name-input').value.length !== 0 &&
    document.getElementById('cpf-input').value.length !== 0 &&
    document.getElementById('phone-input').value.length !== 0 &&
    document.getElementById('email-input').value.length !== 0 &&
    document.getElementsByTagName('span').length === 0
  }

let showSpinner = () => {
  let button = document.querySelector('footer > button')
  button.innerHTML = ''
  button.parentNode.insertAdjacentHTML('afterbegin', templates.spinner())
}

let appendErrorMessageToElement = (element, message) => {
  let errorTemplate = templates.validationError(message)
  element.parentNode.insertAdjacentHTML('beforeend', errorTemplate)
  element.classList.add('error')
  element.parentNode.lastElementChild.classList.add('error')
}

let validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

let inputLostFocus = (e) => {
  // maintain label animation still user typed
  let element = e.target.nextElementSibling
  if (e.target.value !== '' && window.location.hash !== '#usersList') {
    element.id = "label-up"
  } else {
    if (element.id && element.id === 'label-up') {
      element.removeAttribute('id')
    }
  }
  verifyRegisterForm(e)
}

export { router, inputLostFocus, showSpinner }