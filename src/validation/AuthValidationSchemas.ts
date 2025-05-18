import Joi from "joi";

export const LoginValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
