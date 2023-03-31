const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const secu = require('./security.js');


const app = express();
const port = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

// Route pour traiter la soumission du formulaire de connexion
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Vérifiez si l'utilisateur existe dans la base de données
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    } else if (row) {
      // Si l'utilisateur existe, stockez son nom dans la session
      req.session.authenticated = true;
      req.session.username = username;

      // Renvoyer une réponse indiquant que l'authentification a réussi
      res.status(200).send('Authentification réussie');
    } else {
      // Sinon, affichez un message d'erreur
      res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  });
});

// Route pour se déconnecter
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send('Déconnexion réussie');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur d'authentification démarré sur le port ${port}`);
});
