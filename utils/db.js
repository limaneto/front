(function () {

  /*
    Returns a array of objects
  * */
  let getUsers = () => {
    if (!localStorage.getItem('users')) {
      alert('There is no user registered.')
    } else {
      return JSON.parse(localStorage.getItem('users')) || [];
    }
  }

  let saveUser = user => {
    if (isUserRegistered(user)) {
      alert('Email already in use.')
    } else {
      let users = getUsers();
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users));
      if (isUserRegistered(user)) {
        alert('User registered successfully.')
      } else {
        alert('Was not possible to register the User.')
      }
    }
  }

  let removeUser = userToRemove => {
    if (!localStorage.getItem('users')) {
      alert('There is no user registered.')
    } else {
      let users = getUsers();
      users = users.filter(user => {
        return user.email !== userToRemove.email
      })
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  let isUserRegistered = (userToRegister) => {
    return typeof getUsers().find((user) => { return user.email === userToRegister.email }) !== 'undefined'
  }

  if (self && self.self) {
    window.easyInvest.utils = { saveUser, removeUser, getUsers, isUserRegistered }
  }
})();