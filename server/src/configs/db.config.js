require('dotenv').config({ path: '.env.local' });

const env = process.env;

const db = {
  uri: `${env.DATABASE_HOST}${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_URL}`
};

module.exports = db;