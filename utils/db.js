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
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  if (self && self.self) {
    window.easyInvest.utils = { saveUser, getUsers }
  }
})();