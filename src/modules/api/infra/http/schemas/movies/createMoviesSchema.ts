import Joi from 'joi';

export const createMoviesSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    description: Joi.string().lowercase().required(),
    year: Joi.string().required(),
    author: Joi.string().lowercase().required(),
    genre: Joi.string().lowercase().required(),
    available: Joi.boolean().required()
});
