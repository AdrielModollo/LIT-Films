import Joi from 'joi';

export const createMoviesSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    available: Joi.boolean().required()
});
