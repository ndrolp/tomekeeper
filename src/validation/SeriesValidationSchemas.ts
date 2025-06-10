import Joi from "joi";

export const SeriesCreationSchema = Joi.object({
  name: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
}).optional();
