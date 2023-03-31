const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('my_database.db');
const crypto = require('./security.js');
const aes256 = require('aes256');


//Création de la table utilisateurs
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL, password TEXT NOT NULL)');
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['john', 'password123']);
  //db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['jane', 'abc123']);
});


//Récupération des utilisateurs
db.all("SELECT * FROM USERS", [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row.id, row.username, aes256.decrypt("mySecretKey", row.password));
  });
});


db.close();