import joi from "joi";

export default joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  cpf: joi
    .string()
    .pattern(/^[0-9]|[./-]+$/)
    .length(14)
    .required(),
  birthday: joi
    .string()
    .pattern(
      new RegExp(
        "^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$"
      )
    )
    .required(),
  address: joi
    .object({
      cep: joi
        .string()
        .pattern(/^[0-9]|[-]+$/)
        .length(9)
        .required(),
      street: joi.string().required(),
      city: joi.string().required(),
      number: joi.string().required(),
      state: joi.string().length(2).required(),
      neighborhood: joi.string().required(),
      addressDetail: joi.string().allow(null, ""),
    })
    .required(),
  phone: joi
    .string()
    .pattern(/^\((\d){2}\) 9?(\d){4}-(\d){4}$/)
    .min(14)
    .max(15)
    .required(),
});
