import express from 'express';
import handler from 'express-async-handler';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import httpStatus from 'http-status';
import accountController from './controllers/account';
import transactionController from './controllers/transaction';
import { ApiError } from './utils/errors';
import { handleErrors } from './middlewares/errors';

const app = express();

app.use(morgan('short'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/accounts', handler(accountController.getAccounts));
app.get('/accounts/:id', handler(accountController.getAccount));
app.post('/accounts', handler(accountController.createAccount));
app.get('/transactions', handler(transactionController.getTransactions));
app.post('/transactions', handler(transactionController.createTransaction));

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(handleErrors);

export default app;
