import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateHomeNumber from "../validation/validateHomeNumber.js";
import validateNumbers from "../validation/validateNumbers.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputFirstName = document.getElementById("profile-input-fname");
const inputLastName = document.getElementById("profile-input-lname");
const inputEmail = document.getElementById("profile-input-email");
const inputPassword = document.getElementById("profile-input-password");
const inputConfirmPassword = document.getElementById(
  "profile-input-confirm-password"
);
const PstateInput = document.getElementById("PstateInput");
const PcountryInput = document.getElementById("PcountryInput");
const PcityInput = document.getElementById("PcityInput");
const PstreetInput = document.getElementById("PstreetInput");
const profileHouseNumber = document.getElementById("profileHouseNumber");
const PzipInput = document.getElementById("PzipInput");
const PphoneInput = document.getElementById("PphoneInput");
const profileAdminCheckBox = document.getElementById("Pcheck-box-admin");
const btnProfile = document.querySelector("#profile-btn");

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
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
      inputFirstName.value = user.firstname;
      inputLastName.value = user.lastname;
      PstateInput.value = user.address.state;
      PcountryInput.value = user.address.country;
      PcityInput.value = user.address.city;
      PstreetInput.value = user.address.street;
      profileHouseNumber.value = user.address.houseNumber;
      PzipInput.value = user.address.zipcode;
      PphoneInput.value = user.address.phoneNumber;
      inputEmail.value = user.email;
      inputPassword.value = user.password;
      if (user.isAdmin) {
        profileAdminCheckBox.checked = true;
      }
    }
  }

  //when page loaded
  if (inputFirstName.value !== "") {
    checkFirstNameInput();
  }
  if (inputLastName.value !== "") {
    checkLastNameInput();
  }
  if (PstateInput.value !== "") {
    checkAdressNamesInput(PstateInput, "PstateInputAlert", stateOk);
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

PstateInput.addEventListener("input", function () {
  checkAdressNamesInput(PstateInput, "PstateInputAlert", stateOk);
});
PcountryInput.addEventListener("input", function () {
  checkAdressNamesInput(PcountryInput, "PcountryInputAlert", countryOk);
});
PcityInput.addEventListener("input", function () {
  checkAdressNamesInput(PcityInput, "PcityInputAlert", cityOk);
});
PstreetInput.addEventListener("input", function () {
  checkAdressNamesInput(PstreetInput, "PstreetInputAlert", streetOk);
});

profileHouseNumber.addEventListener("input", () => {
  checkprofileHouseNumber();
});

PzipInput.addEventListener("input", function () {
  checkNumberInputs(PzipInput, "zipAlert");
  zipOk = checkNumberInputs(PzipInput, "PzipAlert");
  checkIfCanEnableBtn();
});

PphoneInput.addEventListener("input", function () {
  checkNumberInputs(PphoneInput, "phoneAlert");
  phoneOk = checkNumberInputs(PphoneInput, "phoneAlert");
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
    document.getElementById("profile-alert-cpassword").classList.add("d-none");
  } else {
    document
      .getElementById("profile-alert-cpassword")
      .classList.remove("d-none");
    document.getElementById("profile-alert-cpassword").innerHTML = "not equal";
    confirmPasswordOk = false;
  }

  checkIfCanEnableBtn();
});

const checkFirstNameInput = () => {
  let errorArr = validateName(inputFirstName.value);
  //   console.log(reg.test(inputFirstName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputFirstName.classList.remove("is-invalid");
    document.getElementById("profile-alert-name").classList.add("d-none");
    fNameOk = true;
  } else {
    //the text is not ok
    inputFirstName.classList.add("is-invalid");
    document.getElementById("profile-alert-name").classList.remove("d-none");
    document.getElementById("profile-alert-name").innerHTML =
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
    document.getElementById("profile-alert-lname").classList.add("d-none");
    lNameOk = true;
  } else {
    //the text is not ok
    inputLastName.classList.add("is-invalid");
    document.getElementById("profile-alert-lname").classList.remove("d-none");
    document.getElementById("profile-alert-lname").innerHTML =
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

const checkprofileHouseNumber = () => {
  let errorArr = validateHomeNumber(profileHouseNumber.value);
  if (errorArr.length === 0 || profileHouseNumber.value.length < 1) {
    //the text is ok
    profileHouseNumber.classList.remove("is-invalid");
    document.getElementById("profileHouseNumberAlert").classList.add("d-none");
    homeNumberOk = true;
  } else {
    //the text is not ok
    profileHouseNumber.classList.add("is-invalid");
    document
      .getElementById("profileHouseNumberAlert")
      .classList.remove("d-none");
    document.getElementById("profileHouseNumberAlert").innerHTML =
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
    console.log("true");
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
    document.getElementById("profile-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    document.getElementById("profile-alert-email").classList.remove("d-none");
    document.getElementById("profile-alert-email").innerHTML =
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
    document.getElementById("profile-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("profile-alert-password")
      .classList.remove("d-none");
    document.getElementById("profile-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnProfile.disabled = !(
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

btnProfile.addEventListener("click", () => {
  if (
    !(
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
    )
  ) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let userEmail = users.find((item) => item.email === inputEmail.value);
    let user = users.find((item) => item.id === token.id);
    if (userEmail && user.id !== userEmail.id) {
      //the email already token
      showToast("The email already taken", false);
      return;
    }
    if (user) {
      user.firstname = token.name = inputFirstName.value;
      user.lastname = inputLastName.value;
      user.address.state = PstateInput.value;
      user.address.country = PcountryInput.value;
      user.address.city = PcityInput.value;
      user.address.street = PstreetInput.value;
      user.address.houseNumber = profileHouseNumber.value;
      user.address.zipcode = PzipInput.value;
      user.address.phoneNumber = PphoneInput.value;

      user.email = token.email = inputEmail.value;
      user.password = inputPassword.value;
      if (profileAdminCheckBox.checked) {
        user.isAdmin = true;
        token.isAdmin = true;
      } else {
        user.isAdmin = false;
        token.isAdmin = false;
      }

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("token", JSON.stringify(token));
      showToast("Saved");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 3000);
});

export { checkNumberInputs };
