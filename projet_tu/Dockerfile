# Utilisation d'une image Node.js prête à l'emploi
FROM node:14-alpine

# Création du répertoire de travail de l'application
WORKDIR /app

# Copie du package.json et du package-lock.json dans le conteneur
COPY package*.json ./

# Installation des dépendances de l'application
RUN npm install

# Copie des fichiers de l'application dans le conteneur
COPY gestionAvis.js ./
COPY gestionFormations.js ./
COPY gestionUtilisateurs.js ./
COPY authentification.js ./
COPY security.js ./
COPY server.js ./
COPY utilisateurs.db ./
COPY formations.db ./
COPY views/infos.ejs ./
COPY views/login.ejs ./

# Exposition du port 8080 utilisé par l'application
EXPOSE 8080

# Commande à exécuter pour démarrer l'application
CMD [ "node", "server.js" ]
