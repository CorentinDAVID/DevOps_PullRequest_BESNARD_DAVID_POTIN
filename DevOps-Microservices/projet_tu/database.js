const sqlite3 = require('sqlite3').verbose();
const aes256 = require('aes256');
const db = new sqlite3.Database('example.db');

//Création de la table des comptes d'utilisateurs
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, registration_date DATE)");

//Création de la table des écoles de l'enseignement supérieur
db.run("CREATE TABLE IF NOT EXISTS schools (id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, address TEXT NOT NULL, degree TEXT NOT NULL, ects_credits INTEGER)");

//Ajout d'un utilisateur sécurisé
const username = "johndoe";
const password = "mypassword";
const email = "johndoe@example.com";
const registration_date = "2022-01-01";
const encryptedPassword = aes256.encrypt("mySecretKey", password);

const stmt = db.prepare("INSERT INTO users (username, password, email, registration_date) VALUES (?, ?, ?, ?)");
stmt.run(username, encryptedPassword, email, registration_date);
stmt.finalize();

//Récupération des utilisateurs
db.all("SELECT * FROM users", [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row.id, row.username, aes256.decrypt("mySecretKey", row.password), row.email, row.registration_date);
  });
});

//Ajout d'une école
const name = "Université de Paris";
const type = "Université";
const address = "Paris, France";
const degree = "Licence en Mathématiques";
const ects_credits = 180;

db.run("INSERT INTO schools (name, type, address, degree, ects_credits) VALUES (?, ?, ?, ?, ?)", name, type, address, degree, ects_credits);

//Récupération des écoles
db.all("SELECT * FROM schools", [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row.id, row.name, row.type, row.address, row.degree, row.ects_credits);
  });
});

db.close();
