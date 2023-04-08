import showToast from "../services/Toast.js";
import { handlePageChange } from "../routes/router.js";
import PAGES from "../models/pageModel.js";
import checkIfConnected from "../utils/checkIfConnected.js";

let propertiesArr;
let galleryDiv;
let isAdmin;
let deleteProperty;
let showPopup;
let showModal;
let isConnected;

//this function will transfer data from homepage to this page
const initialPropertiesGallery = (
  propertiesArrFromHomePage,
  isAdminParam,
  deletePropertyFromHomePage,
  showPopupFromHomePage,
  showModalFromHomePage
) => {
  galleryDiv = document.getElementById("home-page-properties-gallery");
  isAdmin = isAdminParam;
  deleteProperty = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;
  showModal = showModalFromHomePage;
  isConnected = checkIfConnected();

  updatePropertiesGallery(propertiesArrFromHomePage);
};

const updatePropertiesGallery = (propertiesArrFromHomePage) => {
  propertiesArr = propertiesArrFromHomePage;
  createGallery();
};

const createCard = (name, description, price, img, id) => {
  const adminBtns = `
  <button type="button" class="btn btn-warning w-100" id="propertyGalleryEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="propertyGalleryDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;

  let propertieCard = `
  <div class="col align-items-stretch" >
    <div class="card" id="${id}" data-id="${id}" >


<img
          src="${img}"
          class="card-img-top"
          alt="${name}"  id="propertyGalleryCardImg-${id}"
        />

      <div class="card-body">
        <h5 class="card-title">${name}</h5>                    <button type="button" class="btn btn-outline-info" id="propertyGalleryModalBtn-${id}">Info</button>


        <p class="card-text">
          ${description}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-success">$${price}                 ${
    isConnected
      ? `<button type="button" class="btn btn-info " id="propertyGalleryCartBtn-${id}"><i class="bi bi-cart-plus"></i> Add to cart</button>`
      : ""
  }     
</li>

      </ul>

      <div class="card-body">
<button type="button" class="btn btn-success w-100" id="propertyGalleryBuyBtn-${id}" >
          <i class="bi bi-currency-dollar"></i> Buy now
        </button>
${isAdmin ? adminBtns : ""}
 </div>
    </div>
  </div>
  `;

  return propertieCard;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("-");
  }
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deleteProperty(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const handleModalBtnClick = (ev) => {
  showModal(getIdFromClick(ev));
  let myModal = document.getElementById("modal2");
  let myModalInstance = new bootstrap.Modal(myModal);

  myModalInstance.show();
};

const handleBuyBtnClick = () => {
  showToast("it's fake site :) you going 404..", true);
  handlePageChange(PAGES.PAGE404);
  setTimeout(() => {
    handlePageChange(PAGES.HOME);
  }, 3500);
};
const handleCartBtnClick = () => {
  showToast("WE WORKING ON IT ;)", true);
  handlePageChange(PAGES.CART);
  setTimeout(() => {
    handlePageChange(PAGES.HOME);
  }, 4000);
};

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createGallery = () => {
  let innerStr = "";
  clearEventListeners("propertyGalleryDeleteBtn", handleDeleteBtnClick);
  clearEventListeners("propertyGalleryEditBtn", handleEditBtnClick);
  clearEventListeners("propertyGalleryModalBtn", handleModalBtnClick);
  clearEventListeners("propertyGalleryCardImg", handleModalBtnClick);
  clearEventListeners("propertyGalleryBuyBtn", handleBuyBtnClick);
  clearEventListeners("propertyGalleryCartBtn", handleCartBtnClick);
  for (let property of propertiesArr) {
    innerStr += createCard(
      property.name,
      property.description,
      property.price,
      property.imgUrl,
      property.id
    );
  }
  galleryDiv.innerHTML = innerStr;
  // add event listeners for  btns
  createBtnEventListener("propertyGalleryDeleteBtn", handleDeleteBtnClick);
  createBtnEventListener("propertyGalleryEditBtn", handleEditBtnClick);
  createBtnEventListener("propertyGalleryModalBtn", handleModalBtnClick);
  createBtnEventListener("propertyGalleryCardImg", handleModalBtnClick);
  createBtnEventListener("propertyGalleryBuyBtn", handleBuyBtnClick);
  createBtnEventListener("propertyGalleryCartBtn", handleCartBtnClick);
};

//Creates event listener for the  buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPropertiesGallery, updatePropertiesGallery };
