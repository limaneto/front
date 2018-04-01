window.easyInvest.db =
  (function () {

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
        alert('Email already in use.')
      } else {
        let users = getUsers();
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users));
        if (isUserRegistered(user)) {
          alert('User info saved.')
          window.location.hash = 'usersList'
        } else {
          alert('Was not possible to save User info.')
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

        if (getUserByEmail(userToRemove.email)) {
          alert('Was not possible to remove user.')
        } else {
          alert('User removed successfully.')
        }
      }
    }

    let editUser = (oldUser, user) => {
      removeUser(oldUser)
      saveUser(user)
    }

    let isUserRegistered = (userToRegister) => {
      return typeof getUsers().find((user) => { return user.email === userToRegister.email }) !== 'undefined'
    }

    return { saveUser, removeUser, getUsers, getUserByEmail, editUser, isUserRegistered }
  })();