import Joi from "joi";

export const SeriesCreationSchema = Joi.object({
  id: Joi.string().optional().allow("", null),
  name: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
}).optional();
