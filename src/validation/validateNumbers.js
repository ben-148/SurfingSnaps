import validate from "./validate.js";
const validateNumbers = (value) => {
  const reg = new RegExp("^[0-9\\s+]+$", "g");

  return validate(reg, value, 9, 20).map((err) => `number is ${err}`);
};

export default validateNumbers;
