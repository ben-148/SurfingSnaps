import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputFirstName = document.getElementById("register-input-fname");
const inputLastName = document.getElementById("register-input-lname");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const inputConfirmPassword = document.getElementById(
  "register-input-confirm-password"
);
const AdminCheckBox = document.getElementById("check-box-admin");
const btnRegister = document.querySelector("#register-btn");

let fNameOk = false;
let lNameOk = false;
let emailOk = false;
let passwordOk = false;
let confirmPasswordOk = false;

window.addEventListener("load", () => {
  //when page loaded
  if (inputFirstName.value !== "") {
    checkNameInput();
  }
  if (inputLastName.value !== "") {
    checkNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
});

inputFirstName.addEventListener("input", () => {
  checkNameInput();
});
inputLastName.addEventListener("input", () => {
  checkLastNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});

inputConfirmPassword.addEventListener("input", () => {
  if (inputPassword.value === inputConfirmPassword.value) {
    confirmPasswordOk = true;
    document.getElementById("register-alert-cpassword").classList.add("d-none");
  } else {
    document
      .getElementById("register-alert-cpassword")
      .classList.remove("d-none");
    document.getElementById("register-alert-cpassword").innerHTML = "not equal";
    confirmPasswordOk = false;
  }

  checkIfCanEnableBtn();
});

const checkNameInput = () => {
  let errorArr = validateName(inputFirstName.value);
  //   console.log(reg.test(inputFirstName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputFirstName.classList.remove("is-invalid");
    document.getElementById("register-alert-name").classList.add("d-none");
    fNameOk = true;
  } else {
    //the text is not ok
    inputFirstName.classList.add("is-invalid");
    document.getElementById("register-alert-name").classList.remove("d-none");
    document.getElementById("register-alert-name").innerHTML =
      errorArr.join("<br>");
    fNameOk = false;
  }
  checkIfCanEnableBtn();
};
const checkLastNameInput = () => {
  let errorArr = validateName(inputLastName.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputLastName.classList.remove("is-invalid");
    document.getElementById("register-alert-lname").classList.add("d-none");
    lNameOk = true;
  } else {
    //the text is not ok
    inputLastName.classList.add("is-invalid");
    document.getElementById("register-alert-lname").classList.remove("d-none");
    document.getElementById("register-alert-lname").innerHTML =
      errorArr.join("<br>");
    lNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputEmail.classList.remove("is-invalid");
    document.getElementById("register-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    document.getElementById("register-alert-email").classList.remove("d-none");
    document.getElementById("register-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputPassword.classList.remove("is-invalid");
    document.getElementById("register-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-password")
      .classList.remove("d-none");
    document.getElementById("register-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnRegister.disabled = !(
    fNameOk &&
    lNameOk &&
    emailOk &&
    passwordOk &&
    confirmPasswordOk
  ));

// const checkIfCanEnableBtn = () => {
//   if (fNameOk && emailOk && passwordOk) {
//     btnRegister.disabled = false;
//   } else {
//     btnRegister.disabled = true;
//   }
// };

btnRegister.addEventListener("click", () => {
  if (!(fNameOk && lNameOk && emailOk && passwordOk && confirmPasswordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let newUser = new User(
    nextUserId++,
    inputFirstName.value,
    inputLastName.value,
    inputEmail.value,
    inputPassword.value
  );
  if (AdminCheckBox.checked) {
    newUser.isAdmin = true;
  }
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    //the first user
    users = [newUser];
    // let user = new User(inputFirstName.value, inputEmail.value, inputPassword.value);
    // users = [user]
    localStorage.setItem("users", JSON.stringify(users));
    /*
      JSON.stringify(users) - convert array of objects to string
      localStorage.setItem - store the json string to localStorage with 
        key users 
        and value users as json string
    */
  } else {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    // console.log("users from localStorage", users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        //display msg - email already exists
        showToast("Email already exists", false);
        return;
      }
    }
    //user provided new email
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
