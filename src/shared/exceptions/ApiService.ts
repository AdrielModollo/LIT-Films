import axios, { AxiosError } from 'axios';
import { HttpException, HttpStatusCode } from './HttpException';

export class ApiService {
    static async get<T>(url: string): Promise<T> {
        try {
            const response = await axios.get<T>(url);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const status = axiosError.response?.status;
                if (status === HttpStatusCode.NOT_FOUND) {
                    throw new HttpException(HttpStatusCode.NOT_FOUND, 'Movie not found');
                }
            }
            throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}
