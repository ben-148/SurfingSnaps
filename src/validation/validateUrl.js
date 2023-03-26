import validate from "./validate.js";

const validateUrl = (value) => {
  const reg = new RegExp(
    /^(?:https?:\/\/)?(?:www\.)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]*$/,
    "i"
  );
  return validate(reg, value, 5, 255).map((err) => `Url is ${err}`);
};

export default validateUrl;
