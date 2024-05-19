import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import httpStatus from 'http-status';
import accountHandler from './handlers/accountHandler';
import transferHandler from './handlers/transferHandler';
import { handleErrors } from './middlewares/errorsMiddleware';
import { validateData } from './middlewares/validationMiddleware';
import { accountCreationSchema } from './schemas/accountSchema';
import { transferMakeSchema } from './schemas/transferSchema';
import { ApiError } from './utils/errors';

const app = express();

/** Register middlewares to application. */

app.use(morgan('short'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** Register routes to application. */

app.get('/accounts', accountHandler.getAccounts);
app.get('/accounts/:id', accountHandler.getAccountById);

app.post(
  '/accounts',
  validateData(accountCreationSchema),
  accountHandler.createAccount,
);

app.post(
  '/transfers',
  validateData(transferMakeSchema),
  transferHandler.makeTransfer,
);

/** Middlewares for 404 routes and thrown errors.. */

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(handleErrors);

export default app;
