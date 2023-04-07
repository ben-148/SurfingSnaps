import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateHomeNumber from "../validation/validateHomeNumber.js";
import validateNumbers from "../validation/validateNumbers.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputFirstName = document.getElementById("register-input-fname");
const inputLastName = document.getElementById("register-input-lname");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const inputConfirmPassword = document.getElementById(
  "register-input-confirm-password"
);
const stateInput = document.getElementById("stateInput");
const countryInput = document.getElementById("countryInput");
const cityInput = document.getElementById("cityInput");
const streetInput = document.getElementById("streetInput");
const homeNumberInput = document.getElementById("homeNumberInput");
const zipInput = document.getElementById("zipInput");
const phoneInput = document.getElementById("phoneInput");
const AdminCheckBox = document.getElementById("check-box-admin");
const btnRegister = document.querySelector("#register-btn");

let fNameOk = false;
let lNameOk = false;
let stateOk = { value: true };
let cityOk = { value: true };
let countryOk = { value: true };
let streetOk = { value: true };
let homeNumberOk = true;
let zipOk = true;
let phoneOk = true;
let emailOk = false;
let passwordOk = false;
let confirmPasswordOk = false;

window.addEventListener("load", () => {
  //when page loaded
  if (inputFirstName.value !== "") {
    checkFirstNameInput();
  }
  if (inputLastName.value !== "") {
    checkLastNameInput();
  }
  if (stateInput.value !== "") {
    checkAdressNamesInput(stateInput, "stateInputAlert", stateOk);
  }

  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
});

inputFirstName.addEventListener("input", () => {
  checkFirstNameInput();
});
inputLastName.addEventListener("input", () => {
  checkLastNameInput();
});

stateInput.addEventListener("input", function () {
  checkAdressNamesInput(stateInput, "stateInputAlert", stateOk);
});
countryInput.addEventListener("input", function () {
  checkAdressNamesInput(countryInput, "countryInputAlert", countryOk);
});
cityInput.addEventListener("input", function () {
  checkAdressNamesInput(cityInput, "cityInputAlert", cityOk);
});
streetInput.addEventListener("input", function () {
  checkAdressNamesInput(streetInput, "streetInputAlert", streetOk);
});

homeNumberInput.addEventListener("input", () => {
  checkHomeNumberInput();
});

zipInput.addEventListener("input", function () {
  checkNumberInputs(zipInput, "zipAlert");
  zipOk = checkNumberInputs(zipInput, "zipAlert");
  checkIfCanEnableBtn();
});

phoneInput.addEventListener("input", function () {
  checkNumberInputs(phoneInput, "phoneAlert");
  phoneOk = checkNumberInputs(phoneInput, "phoneAlert");
  checkIfCanEnableBtn();
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

const checkFirstNameInput = () => {
  let errorArr = validateName(inputFirstName.value);
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

const checkAdressNamesInput = (inputName, alertDivId, inputOk) => {
  let errorArr = validateName(inputName.value);
  if (errorArr.length === 0 || inputName.value.length < 1) {
    // the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");

    inputOk.value = true;
  } else {
    // the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML =
      "Capital first letter. At least two letters";
    inputOk.value = false;
  }

  checkIfCanEnableBtn();
};

const checkHomeNumberInput = () => {
  let errorArr = validateHomeNumber(homeNumberInput.value);
  if (errorArr.length === 0 || homeNumberInput.value.length < 1) {
    //the text is ok
    homeNumberInput.classList.remove("is-invalid");
    document.getElementById("homeNumberAlert").classList.add("d-none");
    homeNumberOk = true;
  } else {
    //the text is not ok
    homeNumberInput.classList.add("is-invalid");
    document.getElementById("homeNumberAlert").classList.remove("d-none");
    document.getElementById("homeNumberAlert").innerHTML =
      errorArr.join("<br>");
    homeNumberOk = false;
  }
  checkIfCanEnableBtn();
};

const checkNumberInputs = (numberInput, alertDivId) => {
  let errorArr = validateNumbers(numberInput.value);
  if (errorArr.length === 0 || numberInput.value.length < 1) {
    // the text is ok
    numberInput.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");
    return true;
  } else {
    // the text is not ok
    numberInput.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML = errorArr.join("<br>");
    return false;
  }
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
    confirmPasswordOk &&
    stateOk.value &&
    cityOk.value &&
    countryOk.value &&
    streetOk.value &&
    homeNumberOk &&
    zipOk &&
    phoneOk
  ));

btnRegister.addEventListener("click", () => {
  if (!(fNameOk && lNameOk && emailOk && passwordOk && confirmPasswordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let address = {
    state: stateInput.value,
    country: countryInput.value,
    city: cityInput.value,
    street: streetInput.value,
    houseNumber: homeNumberInput.value,
    zipcode: zipInput.value,
    phoneNumber: phoneInput.value,
  };
  let newUser = new User(
    nextUserId++,
    inputFirstName.value,
    inputLastName.value,
    inputEmail.value,
    inputPassword.value,
    address
  );

  if (AdminCheckBox.checked) {
    newUser.isAdmin = true;
  }
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    //the first user
    users = [newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    //we have users
    users = JSON.parse(users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        //display msg - email already exists
        showToast("Email already exists", false);
        return;
      }
    }
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
