class User {
  id;
  firstname;
  lastname;
  email;
  password;
  isAdmin;
  constructor(id, firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.id = id;
  }
}
export default User;
