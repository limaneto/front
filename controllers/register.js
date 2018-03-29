(function () {
  document['user-register'].addEventListener('submit', registerUser)

  document.querySelector('footer > button').addEventListener('click', registerUser)

  function registerUser (e) {
    e.preventDefault();

    let name = document.getElementById('name-input').value.trim()
    let cpf = document.getElementById('cpf-input').value.trim()
    let phone = document.getElementById('phone-input').value.trim()
    let email = document.getElementById('email-input').value.trim()

  }
})()