import * as templates from '../templates'

/*
  Returns a array of objects
* */
let getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
}

let getUserByEmail = (email) => {
  return getUsers().find((user) => { return email === user.email })
}

let saveUser = user => {
  if (isUserRegistered(user)) {
    showTopModal('Email já registrado.', 'error-modal')
  } else {
    let users = getUsers();
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
    if (isUserRegistered(user)) {
      showTopModal('Usuário salvo.', 'success-modal')
      window.location.hash = 'usersList'
    } else {
      showTopModal('Não foi possível salvar usuário.', 'error-modal')
      window.location.hash = 'usersList'
    }
  }
}

let addTopModalEventListener = () => {
  document.querySelector('body #top-modal > h4').addEventListener('click', () => {
    document.querySelector('body #top-modal').remove()
  })
}

let removeUser = userToRemove => {
  let users = getUsers();
  users = users.filter(user => {
    return user.email !== userToRemove.email
  })
  localStorage.setItem('users', JSON.stringify(users));

  if (getUserByEmail(userToRemove.email)) {
    showTopModal('Não foi possível remover usuário.', 'error-modal')
  } else {
    showTopModal('Usuário removido.', 'success-modal')
  }
}

let showTopModal = (message, messageType) => {
  document.body.insertAdjacentHTML('afterbegin', templates.topModal(message))
  document.getElementById('top-modal').setAttribute('class', messageType)
  addTopModalEventListener()
}

let editUser = (oldUser, user) => {
  let users = getUsers();
  users = users.filter(user => {
    return user.email !== oldUser.email
  })
  localStorage.setItem('users', JSON.stringify(users));
  saveUser(user)
}

let isUserRegistered = (userToRegister) => {
  return typeof getUsers().find((user) => { return user.email === userToRegister.email }) !== 'undefined'
}

export { saveUser, removeUser, getUsers, getUserByEmail, editUser, isUserRegistered }