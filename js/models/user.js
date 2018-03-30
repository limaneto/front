(function () {
  class User {
    constructor(name, cpf, phone, email) {
      this.name = name;
      this.cpf = cpf;
      this.phone = phone;
      this.email = email;
    }
  }

  User.prototype.example = function () {
  };

  if (self && self.self) {
    window.easyInvest = window.easyInvest || {};
    window.easyInvest.models = window.easyInvest.models || {};
    window.easyInvest.models.User = User;
  }
})();