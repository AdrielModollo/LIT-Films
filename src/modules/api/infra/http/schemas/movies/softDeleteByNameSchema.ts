import Joi from 'joi';

export const softDeleteByNameMovieSchema = Joi.object().keys({
    name: Joi.string().lowercase().required(),
});
