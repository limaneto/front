(function () {
  let saveUser = user => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
  }

  if (self && self.self) {
    window.easyInvest.utils = { saveUser}
  }
})();