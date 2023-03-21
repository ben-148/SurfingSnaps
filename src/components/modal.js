const modalDspImg = document.getElementById("modalDspImg");
const modalDspName = document.getElementById("modalDspName");
const modalDspDescreption = document.getElementById("modalDspDescreption");
const modalDspPrice = document.getElementById("modalDspPrice");
const modalDspId = document.getElementById("modalDspId");

let selectedItem;
const initModal = (selectedItemFromHomePage) => {
  selectedItem = selectedItemFromHomePage;
  modalDspImg.src = selectedItem.imgUrl;
  modalDspName.textContent = selectedItem.name;
  modalDspDescreption.textContent = selectedItem.description;
  modalDspPrice.textContent = `price: ${selectedItem.price}`;
  modalDspId.textContent = "id: " + selectedItem.id;
};

export { initModal };
