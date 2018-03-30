window.templates = window.templates || {};
window.templates.registerFormTemplate = function (user) {
  return `<form name="user-register">
      <div class="name">
        <label id="erro-name"></label>
        <input type="text" id="name-input">
        <label for="name-input">Nome Completo (sem abreviações)</label>
      </div>
      <div class="cpf">
        <label id="erro-cpf"></label>
        <input type="text" id="cpf-input">
        <label for="cpf-input">CPF</label>
      </div>
      <div class="phone">
        <label id="erro-phone"></label>
        <input type="text" id="phone-input">
        <label for="phone-input">Telefone</label>
      </div>
      <div class="email">
        <label id="erro-email"></label>
        <input type="text" id="email-input">
        <label for="email-input">Email</label>
      </div>
      <footer>
      </footer>
    </form>`
}