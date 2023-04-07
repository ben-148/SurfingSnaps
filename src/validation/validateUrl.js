import validate from "./validate.js";

const validateUrl = (value) => {
  const reg = new RegExp(
    /^https?:\/\/(?:www\.)?[\w.-]+(?:\.[\w.-]+)*[\w\-._~:/?#[\]@!$&'()*+,;=%_]*$/,
    "i"
  );

  return validate(reg, value, 5, 1000).map((err) => `Url is ${err}`);
};

export default validateUrl;
