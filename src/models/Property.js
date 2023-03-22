// import getDate from "../utils/getDate";
class Property {
  id;
  name;
  price;
  description;
  imgUrl;
  credit;
  // createdAT;
  constructor(id, name, price, description, imgUrl, credit, createdAT) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.credit = credit;
    /*     this.createdAT = getDate();
     */
  }
}
export default Property;
