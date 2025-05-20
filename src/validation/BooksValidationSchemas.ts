import Joi from "joi";

export const BookCreationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string(),
  genre: Joi.string(),
  publicationYear: Joi.number().integer(),
  description: Joi.string(),
  language: Joi.string(),
});
