import { config } from 'dotenv';
import { number, object, string } from 'joi';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = object()
  .keys({
    NODE_ENV: string().valid('production', 'development', 'test').required(),
    PORT: number().default(3000),
    MONGODB_HOST: string().required().description('Mongo DB host'),
    MONGODB_PORT: number().required().description('Mongo DB port'),
    MONGO_INITDB_DATABASE: string().required().description('Mongo DB initial database'),
    MONGO_INITDB_ROOT_USERNAME: string().required().description('Mongo DB root username'),
    MONGO_INITDB_ROOT_PASSWORD: string().required().description('Mongo DB root password'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongoose = {
  url: `mongodb://${envVars.MONGODB_HOST}:${envVars.MONGODB_PORT}/${envVars.MONGO_INITDB_DATABASE}?authSource=admin`,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
