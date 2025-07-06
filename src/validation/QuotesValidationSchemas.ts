import Joi from "joi"

export const QuotesCreationValidationSchem = Joi.object({
    bookId: Joi.number().integer().required(),
    text: Joi.string().required(),
    character: Joi.string().allow("", null),
    comment: Joi.string().allow("", null),
})
