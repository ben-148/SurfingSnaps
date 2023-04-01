import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";
import validateName from "../validation/validateName.js";
import { checkNumberInputs } from "../pages/ProfilePage.js";
import validatePrice from "../validation/validatePrice.js";
import validateUrl from "../validation/validateUrl.js";
import validateImageName from "../validation/validateImageName.js";
import validateImageDescription from "../validation/validateImageDescription.js";

let selectedProperty, editProperty;
const editPropertiesPopupImgDisplay = document.getElementById(
  "editPropertiesPopupImgDisplay"
);
const editPropertiesPopupName = document.getElementById(
  "editPropertiesPopupName"
);
const editPropertiesPopupDescription = document.getElementById(
  "editPropertiesPopupDescription"
);
const editPropertiesPopupPrice = document.getElementById(
  "editPropertiesPopupPrice"
);
const editPropertiesPopupCredit = document.getElementById(
  "editPropertiesPopupCredit"
);
const editPropertiesPopupImg = document.getElementById(
  "editPropertiesPopupImg"
);

let titleOk = { value: false };
let priceOk = { value: false };
let descriptionOk = { value: false };
let creditOk = { value: false };
let imgOk = { value: false };

const initPopup = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
  } else {
    selectedProperty = new Property(getNextId(), "", "", "", "", "");
  }
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  editPropertiesPopupName.value = selectedProperty.name;
  editPropertiesPopupDescription.value = selectedProperty.description;
  editPropertiesPopupPrice.value = ` ${selectedProperty.price}`;
  editPropertiesPopupCredit.value = selectedProperty.credit;
  editPropertiesPopupImg.value = selectedProperty.imgUrl;
  showPopup();
};

let myModal = document.getElementById("modal1"); // Get the modal element
let myModalInstance = new bootstrap.Modal(myModal); // Create a modal instance

const showPopup = () => {
  myModalInstance.show();
  if (editPropertiesPopupName.value !== "") {
    checksStringInput(editPropertiesPopupName, "popup-alert-name", titleOk);
  }
  if (editPropertiesPopupDescription.value !== "") {
    checksDescriptionInput(
      editPropertiesPopupDescription,
      "popup-alert-description",
      descriptionOk
    );
  }
  if (editPropertiesPopupCredit.value !== "") {
    checksStringInput(
      editPropertiesPopupCredit,
      "popup-alert-credit",
      creditOk
    );
  }
  if (editPropertiesPopupImg.value !== "") {
    checkUrlInput(editPropertiesPopupImg, "popup-alert-img", imgOk);
  }
  if (editPropertiesPopupPrice.value !== "") {
    checkPriceInput(editPropertiesPopupPrice, "popup-alert-price", priceOk);
  }
};

const hidePopup = () => {
  myModalInstance.hide();
};

window.addEventListener("load", () => {
  document
    .getElementById("editPropertiesPopupSaveBtn")
    .addEventListener("click", () => {
      selectedProperty.name = editPropertiesPopupName.value;
      selectedProperty.description = editPropertiesPopupDescription.value;
      selectedProperty.price = editPropertiesPopupPrice.value;
      selectedProperty.credit = editPropertiesPopupCredit.value;
      selectedProperty.imgUrl = editPropertiesPopupImg.value;
      editProperty(selectedProperty);
      hidePopup();
    });

  editPropertiesPopupImg.addEventListener("input", () => {
    editPropertiesPopupImgDisplay.src = editPropertiesPopupImg.value;
  });
});

editPropertiesPopupName.addEventListener("input", function () {
  checksStringInput(editPropertiesPopupName, "popup-alert-name", titleOk);
});
editPropertiesPopupDescription.addEventListener("input", function () {
  checksDescriptionInput(
    editPropertiesPopupDescription,
    "popup-alert-description",
    descriptionOk
  );
});
editPropertiesPopupCredit.addEventListener("input", function () {
  checksStringInput(editPropertiesPopupCredit, "popup-alert-credit", creditOk);
});

editPropertiesPopupPrice.addEventListener("input", function () {
  checkPriceInput(editPropertiesPopupPrice, "popup-alert-price", priceOk);
});
editPropertiesPopupImg.addEventListener("input", function () {
  checkUrlInput(editPropertiesPopupImg, "popup-alert-img", imgOk);
});

const checksStringInput = (inputName, alertDivId, inputOk) => {
  let errorArr = validateImageName(inputName.value);
  if (errorArr.length === 0) {
    // the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");

    inputOk.value = true;
  } else {
    // the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML = document.getElementById(
      alertDivId
    ).innerHTML = errorArr.join("<br>");
    inputOk.value = false;
  }

  checkIfCanEnableBtn();
};
const checksDescriptionInput = (inputName, alertDivId, inputOk) => {
  let errorArr = validateImageDescription(inputName.value);
  if (errorArr.length === 0) {
    // the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");

    inputOk.value = true;
  } else {
    // the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML = document.getElementById(
      alertDivId
    ).innerHTML = errorArr.join("<br>");
    inputOk.value = false;
  }

  checkIfCanEnableBtn();
};

const checkPriceInput = (inputName, alertDivId, inputOk) => {
  let errorArr = validatePrice(inputName.value);
  if (errorArr.length === 0) {
    // the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");

    inputOk.value = true;
  } else {
    // the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML = errorArr.join("<br>");
    //  "only numbers please";
    inputOk.value = false;
  }

  checkIfCanEnableBtn();
};
const checkUrlInput = (inputName, alertDivId, inputOk) => {
  let errorArr = validateUrl(inputName.value);
  if (errorArr.length === 0) {
    // the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById(alertDivId).classList.add("d-none");

    inputOk.value = true;
  } else {
    // the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById(alertDivId).classList.remove("d-none");
    document.getElementById(alertDivId).innerHTML = errorArr.join("<br>");
    //  "only numbers please";
    inputOk.value = false;
  }
  /*   if (!editPropertiesPopupImgDisplay) {
    document.getElementById(alertDivId).innerHTML = "no image found";
  }
 */
  checkIfCanEnableBtn();
};

const popupSaveBtn = document.getElementById("editPropertiesPopupSaveBtn");

const checkIfCanEnableBtn = () =>
  (popupSaveBtn.disabled = !(
    titleOk.value &&
    priceOk.value &&
    descriptionOk.value &&
    creditOk.value &&
    imgOk.value
  ));

export { initPopup, showPopup, hidePopup };
