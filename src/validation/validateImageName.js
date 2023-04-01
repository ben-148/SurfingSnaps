import validate from "./validate.js";
const validateImageName = (value) => {
  const reg = new RegExp("^[A-Za-z0-9-'\"\\s]{0,}$", "g");

  return validate(reg, value, 2, 50).map((err) => `text is ${err}`);
};

export default validateImageName;
