import sqlite from "sqlite3";

const db = new sqlite.Database("./data/database.sqlite");

async function initialize() {
  await dbRun("DROP TABLE IF EXISTS cars");
  await dbRun(
    "CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand STRING, model STRING, color STRING, year INTEGER)"
  );
  await dbRun(
    'INSERT INTO cars (brand, model, color, year) VALUES ("Audi", "A4", "white", 2010)'
  );
  await dbRun(
    'INSERT INTO cars (brand, model, color, year) VALUES ("Toyota", "Corolla", "pink", 2014)'
  );
  await dbRun(
    'INSERT INTO cars (brand, model, color, year) VALUES ("Volvo", "S90", "black", 2020)'
  );
  await dbRun(
    'INSERT INTO cars (brand, model, color, year) VALUES ("Fiat", "Multipla", "crimson", 2002)'
  );
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { db, dbRun, dbGet, dbAll, initialize };
