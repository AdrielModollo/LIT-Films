import Joi from 'joi';

export const querySchemaUpdateRental = Joi.object().keys({
    user_id: Joi.string().required(),
    movie_id: Joi.number().required(),
});

