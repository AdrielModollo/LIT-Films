import Joi from 'joi';

export const createRentalSchema = Joi.object({
    movie_id: Joi.number().required(),
    user_id: Joi.string().required(),
    rental_date: Joi.date().optional(),
    return_date: Joi.date().optional(),
});
