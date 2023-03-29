import validate from "./validate.js";
const validateImageDescription = (value) => {
  const reg = new RegExp("^[A-Za-z0-9-,.?!:;()\\s]+$", "g");
  return validate(reg, value, 2, 1000).map((err) => `text is ${err}`);
};

export default validateImageDescription;
