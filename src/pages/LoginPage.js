import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";

const loginEmailInput = document.querySelector("#login-input-email");
const loginPasswordInput = document.querySelector("#login-input-password");
const loginBtn = document.querySelector("#login-btn");

loginEmailInput.addEventListener("input", () => {
  let errorArr = validateEmail(loginEmailInput.value);
  if (errorArr.length === 0) {
    //no error
    loginEmailInput.classList.remove("is-invalid");
    document.getElementById("login-alert-email").classList.add("d-none");
  } else {
    // error/s
    loginEmailInput.classList.add("is-invalid");
    document.getElementById("login-alert-email").classList.remove("d-none");
    document.getElementById("login-alert-email").innerHTML =
      errorArr.join("<br>");
  }
});

loginPasswordInput.addEventListener("input", () => {
  let errorArr = validatePassword(loginPasswordInput.value);
  if (errorArr.length === 0) {
    //no error
    loginPasswordInput.classList.remove("is-invalid");
    document.getElementById("login-alert-password").classList.add("d-none");
  } else {
    // error/s
    loginPasswordInput.classList.add("is-invalid");
    document.getElementById("login-alert-password").classList.remove("d-none");
    document.getElementById("login-alert-password").innerHTML =
      errorArr.join("<br>");
  }
});

loginBtn.addEventListener("click", () => {
  if (validateEmail(loginEmailInput.value).length) {
    return;
  }
  if (validatePassword(loginPasswordInput.value).length) {
    return;
  }
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    return;
  }
  let user = users.find(
    (item) =>
      item.email === loginEmailInput.value &&
      item.password === loginPasswordInput.value
  );
  if (!user) {
    return;
  }
  //remember who connected
  localStorage.setItem(
    "token",
    JSON.stringify({
      id: user.id,
      name: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  );
  location.reload(); // refresh the page
});
