export interface ICreateRentalDTO {
    movie_id: string;
    user_id: string;
    rental_date: Date;
    return_date?: Date;
}