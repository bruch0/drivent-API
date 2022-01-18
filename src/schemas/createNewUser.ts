import joi from "joi";

export default joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});
