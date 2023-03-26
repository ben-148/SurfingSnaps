import validate from "./validate.js";
const validatePrice = (value) => {
  const reg = new RegExp("^[0-9\\s+]+$", "g");

  return validate(reg, value, 1, 10).map((err) => `price is ${err} `);
};

export default validatePrice;
