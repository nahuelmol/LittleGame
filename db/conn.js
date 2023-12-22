const { Client } = require('pg');

const client = new Client({
  user: process.env.PG_USER,
  host: '127.0.0.1',
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Conectar a PostgreSQL
async function connect() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    return client;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    throw error;
  }
}

module.exports = {
  connect,
};
