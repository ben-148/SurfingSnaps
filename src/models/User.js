class User {
  id;
  firstname;
  lastname;
  email;
  password;
  isAdmin;
  address;

  constructor(id, firstname, lastname, email, password, address) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.id = id;
    this.address = {
      state: address.state,
      country: address.country,
      city: address.city,
      street: address.street,
      houseNumber: address.houseNumber,
      zipcode: address.zipcode,
      phoneNumber: address.phoneNumber,
    };
  }
}

export default User;
