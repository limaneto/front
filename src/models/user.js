class User {
  constructor(name, cpf, phone, email) {
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.email = email;
  }
}

User.prototype.example = function () {
}

export default User