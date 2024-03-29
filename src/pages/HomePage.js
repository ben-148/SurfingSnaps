import {
  initialPropertiesGallery,
  updatePropertiesGallery,
} from "../components/PropertiesGallery.js";
import {
  initialPropertiesList,
  updatePropertiesList,
} from "../components/PropertiesList.js";
import {
  initialPropertiesCarousel,
  updatePropertiesCarousel,
} from "../components/PropertiesCarousel.js";
import { initPopup } from "../components/Popup.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import { initModal } from "../components/modal.js";

let propertiesArr, originalPropertiesArr;
let displayNow; // display that we can see now

/* btns */
let homeDisplayList;
let homeDisplayGallery;
let homeDisplayCousel;
/* displays */
let propertiesGallery;
let propertiesList;
let propertiesCarusel;

let isAdmin;

window.addEventListener("load", () => {
  propertiesArr = localStorage.getItem("props");
  if (!propertiesArr) {
    return;
  }
  propertiesArr = JSON.parse(propertiesArr);
  originalPropertiesArr = [...propertiesArr];
  isAdmin = checkIfAdmin();
  //passing propertiesArr to PropertiesGallery.js
  initialPropertiesGallery(
    propertiesArr,
    isAdmin,
    deleteProperty,
    showPopup,
    showModal
  );
  initialPropertiesList(
    propertiesArr,
    isAdmin,
    deleteProperty,
    showPopup,
    showModal
  );
  initialPropertiesCarousel(propertiesArr);
  initializeElements();
  initializeBtns();
});

const initializeElements = () => {
  /* btns */
  homeDisplayList = document.getElementById("homeDisplayList");
  homeDisplayGallery = document.getElementById("homeDisplayGallery");
  homeDisplayCousel = document.getElementById("homeDisplayCousel");
  /* divs */
  propertiesGallery = document.getElementById("propertiesGallery");
  propertiesList = document.getElementById("propertiesList");
  propertiesCarusel = document.getElementById("propertiesCarusel");
  displayNow = propertiesCarusel; // choose who we want to display

  displayToDisplay(
    displayNow,
    homeDisplayCousel,
    homeDisplayGallery,
    homeDisplayList
  );
};

const initializeBtns = () => {
  homeDisplayList.addEventListener("click", () => {
    displayToDisplay(
      propertiesList,
      homeDisplayList,
      homeDisplayCousel,
      homeDisplayGallery
    );
  });
  homeDisplayGallery.addEventListener("click", () => {
    displayToDisplay(
      propertiesGallery,
      homeDisplayGallery,
      homeDisplayCousel,
      homeDisplayList
    );
  });
  homeDisplayCousel.addEventListener("click", () => {
    displayToDisplay(
      propertiesCarusel,
      homeDisplayCousel,
      homeDisplayList,
      homeDisplayGallery
    );
  });
  document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => {
      sortPropertys();
    });
  document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => {
      sortPropertys(false);
    });
  document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => {
      let regex = new RegExp("^" + ev.target.value, "i");
      propertiesArr = originalPropertiesArr.filter((item) => {
        let reg = regex.test(item.name);
        return reg;
      });
      updateDisplays();
    });
};

const displayToDisplay = (toDisplay, btnToHide, btnToShow, btnToShow2) => {
  // hide what we currently showing
  displayNow.classList.remove("d-block");
  displayNow.classList.add("d-none");
  btnToHide.classList.remove("d-block");
  btnToHide.classList.add("d-none");
  // show what we want to display now
  toDisplay.classList.remove("d-none");
  toDisplay.classList.add("d-block");
  btnToShow.classList.remove("d-none");
  btnToShow2.classList.remove("d-none");
  //this is what we displaying now
  displayNow = toDisplay;
};

const updateDisplays = () => {
  updatePropertiesGallery(propertiesArr); // update gallery
  updatePropertiesList(propertiesArr); // update list
  updatePropertiesCarousel(propertiesArr); // update carousel
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("props", JSON.stringify(arrToSave));
};

const deleteProperty = (id) => {
  id = +id; //convert string to number
  originalPropertiesArr = originalPropertiesArr.filter(
    (item) => item.id !== id
  );
  saveToLocalStorage(originalPropertiesArr);
  propertiesArr = propertiesArr.filter((item) => item.id !== id); //delete property by id
  updateDisplays();
};

const sortPropertys = (asc = true) => {
  if (asc) {
    // from a to z
    propertiesArr.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // from z to a
    propertiesArr.sort((a, b) => b.name.localeCompare(a.name));
  }
  updateDisplays();
};

const showPopup = (id) => {
  let selectedProperty = propertiesArr.find((item) => item.id === +id);
  if (!selectedProperty) {
    return;
  }
  initPopup(selectedProperty, editProperty);
};
const showModal = (id) => {
  let selectedItem = propertiesArr.find((item) => item.id === +id);
  if (!selectedItem) {
    return;
  }
  initModal(selectedItem);
};

const showNewPopup = () => {
  initPopup(undefined, addNewProperty);
};

const addNewProperty = (newProperty) => {
  originalPropertiesArr = [...originalPropertiesArr, newProperty];
  let nextId = +newProperty.id + 1;
  localStorage.setItem("nextid", nextId + "");
  propertiesArr = [...originalPropertiesArr];
  editProperty();
};

const editProperty = () => {
  saveToLocalStorage(originalPropertiesArr);
  updateDisplays(); // update html
};

export { showNewPopup, displayToDisplay };
