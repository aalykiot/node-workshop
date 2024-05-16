import 'dotenv/config';
import server from './server';
import { logger } from './utils/logger';

const PORT = Number.parseInt(process.env.PORT || '3000', 10);

server.listen(PORT, '127.0.0.1', () => {
  logger.info(`Server listening on port ${PORT}..`);
});
