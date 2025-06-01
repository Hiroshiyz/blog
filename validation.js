const Joi = require("joi");

//register validate
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(1024).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(data);
};
//login validate
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(1024).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(data);
};
//post validate
const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).max(9999).required(),
  });
  return schema.validate(data);
};
const resetValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.resetValidation = resetValidation;
