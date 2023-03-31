const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3003;

const db = new sqlite3.Database('my_database.db');

app.use(express.json());

// Route pour récupérer toutes les formations
app.get('/formations', (req, res) => {
db.all('SELECT * FROM formation', (err, formations) => {
if (err) {
console.error(err.message);
res.status(500).send('Erreur serveur');
} else {
res.send(formations);
}
});
});

// Route pour ajouter une nouvelle formation
app.post('/formations', (req, res) => {
const { titre, description } = req.body;
db.run('INSERT INTO formations (titre, description) VALUES (?, ?)', [titre, description], (err) => {
if (err) {
console.error(err.message);
res.status(500).send('Erreur serveur');
} else {
res.send('Formation ajoutée avec succès');
}
});
});

// Route pour supprimer une formation
app.delete('/formations/:id', (req, res) => {
const id = req.params.id;
db.run('DELETE FROM formation WHERE id = ?', [id], (err) => {
if (err) {
console.error(err.message);
res.status(500).send('Erreur serveur');
} else {
res.send('Formation supprimée avec succès');
}
});
});

// Démarrage du serveur
app.listen(port, () => {
console.log(`Serveur de gestion des formations démarré sur le port ${port}`);
});