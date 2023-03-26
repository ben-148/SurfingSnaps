import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";

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

const initPopup = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
  } else {
    selectedProperty = new Property(getNextId(), "", 0, "", "", "");
  }
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  editPropertiesPopupName.value = selectedProperty.name;
  editPropertiesPopupDescription.value = selectedProperty.description;
  editPropertiesPopupPrice.value = selectedProperty.price;
  editPropertiesPopupCredit.value = selectedProperty.credit;
  editPropertiesPopupImg.value = selectedProperty.imgUrl;
  showPopup();
};

let myModal = document.getElementById("modal1"); // Get the modal element
let myModalInstance = new bootstrap.Modal(myModal); // Create a modal instance

const showPopup = () => {
  myModalInstance.show();
};

const hidePopup = () => {
  myModalInstance.hide();
};

window.addEventListener("load", () => {
  /*   editPropertiesPopup.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "editPropertiesPopup" &&
      ev.target.id !== "editPropertiesPopupCancelBtn" &&
      ev.target.id !== "editPropertiesPopupCancelBtnIcon"
    ) {
      return;
    }
    hidePopup();
  });
 */
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

export { initPopup, showPopup, hidePopup };
