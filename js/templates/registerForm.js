window.templates = window.templates || {};
window.templates.registerFormTemplate = function (user) {
  return `<form name="user-register">
      <div class="name">
        <input type="text" id="name-input" autocomplete="of">
        <label for="name-input">Nome Completo (sem abreviações)</label>
      </div>
      <div class="cpf">
        <input type="text" id="cpf-input" autocomplete="of">
        <label for="cpf-input">CPF</label>
      </div>
      <div class="phone">
        <input type="text" id="phone-input" autocomplete="of">
        <label for="phone-input">Telefone</label>
      </div>
      <div class="email">
        <input type="text" id="email-input" autocomplete="of">
        <label for="email-input">Email</label>
      </div>
      <footer>
      </footer>
    </form>`
}