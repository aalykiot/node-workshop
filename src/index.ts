import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger';

const hostname = '127.0.0.1';
const port = Number.parseInt(process.env.PORT || '3000', 10);

const server = app.listen(port, hostname, () => {
  logger.info(`Server listening on port ${port}..`);
});

// Not 100% accurate error handler..
const unexpectedErrorHandler = (error: unknown) => {
  if (server) server.close();
  logger.error(error);
  process.exit(1);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
