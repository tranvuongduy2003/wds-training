import mongoose from 'mongoose';
import { listen } from './app';
import { mongoose as _mongoose, port } from './config/config';
import { info, error as _error } from './config/logger';

let server;

mongoose.connect(_mongoose.url, _mongoose.options).then(() => {
  info('Connected to MongoDB');
  server = listen(port, () => {
    info(`Listening to port ${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  _error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  info('SIGTERM received');
  if (server) {
    server.close();
  }
});
