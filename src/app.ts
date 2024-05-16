import 'dotenv/config';
import server from './server';
import { logger } from './utils/logger';

const hostname = '127.0.0.1';
const port = Number.parseInt(process.env.PORT || '3000', 10);

server.listen(port, hostname, () => {
  logger.info(`Server listening on port ${port}..`);
});
