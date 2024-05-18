import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { ApiError } from './utils/errors';
import { handleErrors } from './middlewares/errors';

const app = express();

app.use(morgan('short'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const notImplemented = () => {
  throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Not implemented!');
};

app.get('/accounts', notImplemented);
app.get('/accounts/:id', notImplemented);
app.post('/accounts', notImplemented);
app.post('/report', notImplemented);

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(handleErrors);

export default app;
