const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_HOST: Joi.string().required().description('Mongo DB host'),
    MONGODB_PORT: Joi.number().required().description('Mongo DB port'),
    MONGO_INITDB_DATABASE: Joi.string().required().description('Mongo DB initial database'),
    MONGO_INITDB_ROOT_USERNAME: Joi.string().required().description('Mongo DB root username'),
    MONGO_INITDB_ROOT_PASSWORD: Joi.string().required().description('Mongo DB root password'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports.env = envVars.NODE_ENV;
module.exports.port = envVars.PORT;
module.exports.mongoose = {
  url: `mongodb://${envVars.MONGO_INITDB_ROOT_USERNAME}:${envVars.MONGO_INITDB_ROOT_PASSWORD}@${envVars.MONGODB_HOST}:${envVars.MONGODB_PORT}/${envVars.MONGO_INITDB_DATABASE}?authSource=admin`,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
