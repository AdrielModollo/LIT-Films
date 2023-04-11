import express from 'express';
import 'reflect-metadata';
import './database';
import './shared/container';
import routes from './shared/routes';
import httpExceptionMiddleware from './modules/api/infra/http/middlewares/errorHandlerMiddleware';

const app = express();

app.use(express.json());

app.use(routes);

app.use(httpExceptionMiddleware);

app.listen(3000, () => {
    console.log('listening on port 3000');
})
