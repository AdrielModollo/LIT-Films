import { Router } from "express";
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import usersRouter from "../../modules/api/infra/http/routes/users.routes";
import authenticateRouter from "../../modules/api/infra/http/routes/auth.routes";
import moviesRoutes from "../../modules/api/infra/http/routes/movies.routes";
import authenticate from "../../modules/api/infra/http/middlewares/authenticateMiddleware";
import { notFoundHandler } from "../../modules/api/infra/http/middlewares/errorHandlerMiddleware";
import rentalsRoutes from "../../modules/api/infra/http/routes/rentals.routes";

const routes = Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../../modules/api/infra/http/swagger/swagger.yaml'));

routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
routes.use('/users', authenticateRouter);
routes.use(authenticate);
routes.use('/users', usersRouter);
routes.use('/movies', moviesRoutes);
routes.use('/rentals', rentalsRoutes);
routes.use(notFoundHandler);

export default routes;
