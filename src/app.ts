import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { ApiError } from './utils/errors';
import { handleErrors } from './middlewares/errors';
import accountController from './controllers/account.controller';

const app = express();

app.use(morgan('short'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const notImplemented = () => {
  throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Not implemented!');
};

app.get('/accounts', asyncHandler(accountController.getAccounts));
app.get('/accounts/:id', asyncHandler(accountController.getAccount));
app.post('/accounts', asyncHandler(accountController.createAccount));
app.post('/transactions', notImplemented);
app.post('/report', notImplemented);

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(handleErrors);

export default app;
