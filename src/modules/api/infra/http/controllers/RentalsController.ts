import { Request, Response } from "express";
import { container } from "tsyringe";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import { CreateRentalService } from "../../../services/rentals/CreateRentalService";
import { createRentalSchema } from "../schemas/rentals/CreateRentalsSchema";
import { UpdateRentalService } from "../../../services/rentals/UpdateRentaService";
import { querySchemaUpdateRental } from "../schemas/rentals/UpdateRentalSchema";

export default class RentalsController {
    public async createRental(request: Request, response: Response, next): Promise<Response> {
        try {
            const { user_id, movie_id, rental_date, return_date } = await createRentalSchema.validateAsync(request.body);

            const createRentalService = container.resolve(CreateRentalService);

            const rental = await createRentalService.execute({
                user_id,
                movie_id,
                rental_date,
                return_date,
            });

            return response.status(201).json(rental);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async updateRental(request: Request, response: Response, next): Promise<Response> {
        try {
            const { query } = request;
            const { user_id, movie_id } = await querySchemaUpdateRental.validateAsync(query);

            const updateRentalService = container.resolve(UpdateRentalService);
            const rental = await updateRentalService.execute({ user_id, movie_id });

            return response.json(rental);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}
