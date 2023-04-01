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
  /*
    this function will get data from homepage and create new list.
    if the list already exists it will remove the old one and
    create new one
  */
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
             <!--       <button type="button" class="btn btn-info" id="propertyListModalBtn-${id}">Info</button>  -->


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
        <button type="button" class="btn btn-success w-100">
          <i class="bi bi-currency-dollar"></i> Buy now
        </button>
        ${isAdmin ? adminBtns : ""}
        </div>
    </div>
    </li>
  `;
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

  // showModal();
};

const createList = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  clearEventListeners("propertyListDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
  clearEventListeners("propertyListEditBtn", handleEditBtnClick);

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
  // add event listeners for delete btns
  createBtnEventListener("propertyListDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("propertyListEditBtn", handleEditBtnClick);
  createBtnEventListener("propertyListModalBtn", handleModalBtnClick);
  createBtnEventListener("propertyListCardImg", handleModalBtnClick);
};

//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPropertiesList, updatePropertiesList };
