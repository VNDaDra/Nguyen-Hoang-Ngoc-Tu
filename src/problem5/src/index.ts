import mongoose from 'mongoose';
import { env } from './common/utils/envConfig';
import { app, logger } from './server';

const server = app.listen(env.PORT, async () => {
  const { NODE_ENV, HOST, PORT, MONGO_URI } = env;
  await mongoose.connect(MONGO_URI);
  logger.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
