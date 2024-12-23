import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { NOT_FOUND } from 'http-status';
import xss from 'xss-clean';
import { env } from './config/config';
import { errorHandler as _errorHandler, successHandler } from './config/morgan';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes/v1';
import ApiError from './utils/ApiError';

const app = express();

if (env !== 'test') {
  app.use(successHandler);
  app.use(_errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(json());

// parse urlencoded request body
app.use(urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
