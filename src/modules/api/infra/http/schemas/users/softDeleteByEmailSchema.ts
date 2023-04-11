import Joi from 'joi';

export const softDeleteByEmailSchema = Joi.object().keys({
    email: Joi.string().required()
});
