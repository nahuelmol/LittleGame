import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");

  stmt.run(1, 'Usuario 1');
  stmt.run(2, 'Usuario 2');

  stmt.finalize();

  db.each("SELECT id, name FROM users", (_err, row) => {
    console.log(`${row.id}: ${row.name}`);
  });
});

db.close();
