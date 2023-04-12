import Joi from 'joi';

export const querySchemaMovie = Joi.object().keys({
    name: Joi.string().lowercase().required(),
});

export const bodySchemaMovie = Joi.object().keys({
    name: Joi.string().lowercase().optional(),
    description: Joi.string().lowercase().optional(),
    year: Joi.string().optional(),
    author: Joi.string().lowercase().optional(),
    genre: Joi.string().lowercase().optional(),
    available: Joi.boolean().optional()
});


