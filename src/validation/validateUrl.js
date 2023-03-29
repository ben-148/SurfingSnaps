import validate from "./validate.js";

const validateUrl = (value) => {
  const reg = new RegExp(
    /^https?:\/\/(?:www\.)?[\w.-]+(?:\.[\w.-]+)*[\w\-._~:/?#[\]@!$&'()*+,;=%_]*$/,
    "i"
  );
  console.log(
    "🚀 ~ file: validateUrl.js:8 ~ validateUrl ~ reg:",
    reg.test(value)
  );

  return validate(reg, value, 5, 255).map((err) => `Url is ${err}`);
};

export default validateUrl;
