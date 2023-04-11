import Joi from 'joi';

export const querySchema = Joi.object().keys({
    email: Joi.string().required(),
});

export const bodySchema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
});


