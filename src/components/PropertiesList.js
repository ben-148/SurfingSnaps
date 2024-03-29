import showToast from "../services/Toast.js";
import { handlePageChange } from "../routes/router.js";
import PAGES from "../models/pageModel.js";

let propertiesArr;
let listDiv;
let isAdmin;
let deleteProperty;
let showPopup;
let showModal;

//this function will transfer data from homepage to this page
const initialPropertiesList = (
  propertiesArrFromHomePage,
  isAdminParam,
  deletePropertyFromHomePage,
  showPopupFromHomePage,
  showModalFromHomePage
) => {
  listDiv = document.getElementById("home-page-properties-list");
  isAdmin = isAdminParam;
  deleteProperty = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;
  showModal = showModalFromHomePage;
  updatePropertiesList(propertiesArrFromHomePage);
};

const updatePropertiesList = (propertiesArrFromHomePage) => {
  propertiesArr = propertiesArrFromHomePage;
  createList();
};

const createItem = (name, description, price, img, id) => {
  const adminBtns = `
  <button type="button" class="btn btn-warning w-100" id="propertyListEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="propertyListDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <li class="list-group-item">
    <div class="row">
        <div class="col-md-2 listItem" >
        <img src="${img}" class="img-fluid" alt="${name}" id="propertyListCardImg-${id}" />


        </div>
        
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${name}</h5> 
            <h6 class="card-subtitle mb-2 text-success

my-2 ">
            $${price}
            </h6>
            <p class="card-text">
            ${description}
            </p>

        </div>
        </div>
        <div class="col-md-2">
        <button type="button" class="btn btn-success w-100" id="propertyListBuyBtn-${id}" >
          <i class="bi bi-currency-dollar"></i> Buy now
        </button>
        ${isAdmin ? adminBtns : ""}
        </div>
    </div>
    </li>
  `;
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
  var myModal = document.getElementById("modal2");
  var myModalInstance = new bootstrap.Modal(myModal);

  myModalInstance.show();
};

const handleBuyBtnClick = () => {
  showToast("it's fake site :) you going 404..", true);
  handlePageChange(PAGES.PAGE404);
  setTimeout(() => {
    handlePageChange(PAGES.HOME);
  }, 3500);
};

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createList = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  clearEventListeners("propertyListDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
  clearEventListeners("propertyListEditBtn", handleEditBtnClick);
  clearEventListeners("propertyListCardImg", handleModalBtnClick);

  //create new elements and remove old ones
  for (let property of propertiesArr) {
    innerStr += createItem(
      property.name,
      property.description,
      property.price,
      property.imgUrl,
      property.id
    );
  }
  listDiv.innerHTML = innerStr;
  // add event listeners for  btns
  createBtnEventListener("propertyListDeleteBtn", handleDeleteBtnClick);
  createBtnEventListener("propertyListEditBtn", handleEditBtnClick);
  // add event listeners for img
  createBtnEventListener("propertyListCardImg", handleModalBtnClick);
  createBtnEventListener("propertyListBuyBtn", handleBuyBtnClick);
};

//Creates event listener for the  buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPropertiesList, updatePropertiesList };
