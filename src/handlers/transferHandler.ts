import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import transferService from '../services/transferService';

const makeTransfer = asyncHandler(async (req: Request, res: Response) => {
  const transfer = await transferService.makeTransfer(req.body);
  res.status(httpStatus.OK).send(transfer);
});

export default { makeTransfer };
