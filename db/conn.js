const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
//instance -> littlegamedb
//dbname -> littlepostgres

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Conectar a PostgreSQL
client.connect();

// Ejemplo de consulta
client.query('SELECT * FROM tu_tabla', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows);
  }

  // Cerrar la conexión
  client.end();
});
