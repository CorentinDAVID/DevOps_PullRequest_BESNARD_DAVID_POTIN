const express = require('express');
const mongoose = require('mongoose');

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/avis', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

// Définition du schéma pour les avis
const avisSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  commentaire: {
    type: String,
    required: true,
    trim: true
  },
  note: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Définition du modèle pour les avis
const Avis = mongoose.model('Avis', avisSchema);

const app = express();
app.use(express.json());

// Récupération de tous les avis
app.get('/avis', async (req, res) => {
  try {
    const avis = await Avis.find();
    res.json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupération d'un avis par son ID
app.get('/avis/:id', getAvis, (req, res) => {
  res.json(res.avis);
});

// Ajout d'un avis
app.post('/avis', async (req, res) => {
  const avis = new Avis({
    nom: req.body.nom,
    commentaire: req.body.commentaire,
    note: req.body.note
  });

  try {
    const nouveauAvis = await avis.save();
    res.status(201).json(nouveauAvis);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modification d'un avis
app.patch('/avis/:id', getAvis, async (req, res) => {
  if (req.body.nom != null) {
    res.avis.nom = req.body.nom;
  }

  if (req.body.commentaire != null) {
    res.avis.commentaire = req.body.commentaire;
  }

  if (req.body.note != null) {
    res.avis.note = req.body.note;
  }

  try {
    const avisMisAJour = await res.avis.save();
    res.json(avisMisAJour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Suppression d'un avis
app.delete('/avis/:id', getAvis, async (req, res) => {
  try {
    await res.avis.remove();
    res.json({ message: 'Avis supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un avis par son ID
async function getAvis(req, res, next) {
    let avis;
    try {
      avis = await Avis.findById(req.params.id);
      if (avis == null) {
        return res.status(404).json({ message: 'Aucun avis trouvé avec cet ID' });
      }
    } catch (err) {
      next(err);
    }
    res.avis = avis;
    next();
  }
  