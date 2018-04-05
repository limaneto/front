export default (user) => {
  return `<form name="user-register">
      <div class="name">
        <input type="text" name="name-input" id="name-input" autocomplete="off">
        <label for="name-input">Nome Completo (sem abreviações)</label>
      </div>
      <div class="cpf">
        <input type="number" id="cpf-input" autocomplete="off">
        <label for="cpf-input">CPF</label>
      </div>
      <div class="phone">
        <input type="tel" id="phone-input" autocomplete="off">
        <label for="phone-input">Telefone</label>
      </div>
      <div class="email">
        <input type="email" id="email-input" autocomplete="off">
        <label for="email-input">Email</label>
      </div>
      <footer>
      </footer>
    </form>`
}