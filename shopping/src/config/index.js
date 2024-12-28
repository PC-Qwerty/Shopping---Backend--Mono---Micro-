const dotEnv = require("dotenv");
dotEnv.config()

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  console.log(configFile)
  dotEnv.config({ path: configFile });
  console.log(process.env.MONGODB_URI)
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  // BASE_URL: process.env.BASE_URL,
  // EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  // MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  // CUSTOMER_SERVICE: "customer_service",
  // SHOPPING_SERVICE: "shopping_service",

  MESSAGE_BROKER_URL : process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME : 'ONLINE_SHOPPING',
  SHOPPING_BINDING_KEY : 'SHOPPING_SERVICE',
  // CUSTOMER_BINDING_KEY : 'CUSTOMER_SERVICE',
  QUEUE_NAME : 'SHOPPING_QUEUE'
};