const Joi = require("joi");

module.exports = {
  registerUser: {
    body: {
      /*_id: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      mobile: Joi.string().required(),
      zipcode: Joi.string().required(),
      starvens_reference: Joi.string().required(),
      */
      mobile: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  loginUser: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
