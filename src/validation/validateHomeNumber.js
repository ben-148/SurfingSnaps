import validate from "./validate.js";
const validateHomeNumber = (value) => {
  const reg = new RegExp("^\\d+([a-zA-Z]{1,2})?(\\/\\d+)?$", "g");

  return validate(reg, value, 1, 8).map((err) => `number is ${err}`);
};

export default validateHomeNumber;
