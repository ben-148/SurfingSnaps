let propertiesArr;
let galleryDiv;
let isAdmin;
let deleteProperty;
let showPopup;
let showModal;

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

  updatePropertiesGallery(propertiesArrFromHomePage);
};

const updatePropertiesGallery = (propertiesArrFromHomePage) => {
  /*
    this function will get data from homepage and create new gallery.
    if the gallery already exists it will remove the old one and
    create new one
  */
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
  <div class="col" >
    <div class="card" id="${id}" data-id="${id}" >


<img
          src="${img}"
          class="card-img-top"
          alt="${name}"  id="propertyGalleryCardImg-${id}"
        />

      <div class="card-body">
        <h5 class="card-title">${name}</h5>                    <button type="button" class="btn btn-info" id="propertyGalleryModalBtn-${id}">Info</button>


        <p class="card-text">
          ${description}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-success">$${price}</li>

      </ul>

      <div class="card-body">
<button type="button" class="btn btn-success w-100">
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
  let idFromId = ev.target.id.split("-"); // split the id to array
  if (!ev.target.id) {
    /*
        if press on icon then there is no id
        then we need to take the id of the parent which is btn
      */
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
  var myModal = document.getElementById("modal2"); // Get the modal element
  var myModalInstance = new bootstrap.Modal(myModal); // Create a modal instance

  myModalInstance.show(); // Show the modal
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
  //clear event listeners for edit btns
  clearEventListeners("propertyGalleryEditBtn", handleEditBtnClick);
  clearEventListeners("propertyGalleryModalBtn", handleModalBtnClick);
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
  // add event listeners for delete btns
  createBtnEventListener("propertyGalleryDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("propertyGalleryEditBtn", handleEditBtnClick);
  createBtnEventListener("propertyGalleryModalBtn", handleModalBtnClick);
  createBtnEventListener("propertyGalleryCardImg", handleModalBtnClick);
};

//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPropertiesGallery, updatePropertiesGallery };
