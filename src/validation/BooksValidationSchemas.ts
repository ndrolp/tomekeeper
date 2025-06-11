import Joi from "joi";
import { SeriesCreationSchema } from "./SeriesValidationSchemas";

export const BookCreationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string(),
  genre: Joi.string(),
  publicationYear: Joi.number().integer(),
  description: Joi.string().optional().allow("", null),
  language: Joi.string(),
  serie: SeriesCreationSchema,
  seriesOrder: Joi.number().optional().allow(""),
  externalCover: Joi.string().optional().allow("", null),
});
