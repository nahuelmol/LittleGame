const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // O especifica un archivo para la persistencia

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");

  stmt.run(1, 'Usuario 1');
  stmt.run(2, 'Usuario 2');

  stmt.finalize();

  db.each("SELECT id, name FROM users", (err, row) => {
    console.log(`${row.id}: ${row.name}`);
  });
});

db.close();
