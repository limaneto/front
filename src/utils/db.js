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
    showTopModal('Email already used.', 'error-modal')
  } else {
    let users = getUsers();
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
    if (isUserRegistered(user)) {
      showTopModal('User info saved.', 'success-modal')
      window.location.hash = 'usersList'
    } else {
      showTopModal('Not possible to save user info.', 'error-modal')
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
  if (!localStorage.getItem('users')) {
    showTopModal('There is no user registered.', 'error-modal')
  } else {
    let users = getUsers();
    users = users.filter(user => {
      return user.email !== userToRemove.email
    })
    localStorage.setItem('users', JSON.stringify(users));

    if (getUserByEmail(userToRemove.email)) {
      showTopModal('Was not possible to remove user.', 'error-modal')
    } else {
      showTopModal('User removed successfully.', 'success-modal')
    }
  }
}

let showTopModal = (message, messageType) => {
  document.body.insertAdjacentHTML('afterbegin', templates.topModal(message))
  document.getElementById('top-modal').setAttribute('class', messageType)
  addTopModalEventListener()
}

let editUser = (oldUser, user) => {
  removeUser(oldUser)
  saveUser(user)
}

let isUserRegistered = (userToRegister) => {
  return typeof getUsers().find((user) => { return user.email === userToRegister.email }) !== 'undefined'
}

export { saveUser, removeUser, getUsers, getUserByEmail, editUser, isUserRegistered }