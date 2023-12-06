# Bibliothèque en Ligne API

## Description

Cette API est une bibliothèque en ligne conçue pour gérer un catalogue de livres. 
Elle permet aux utilisateurs de s'inscrire, de se connecter, de rechercher des livres, d'ajouter de nouvelles entrées, de les modifier ou de les supprimer. 
Ce projet utilise Node.js et Express pour le serveur backend, avec MongoDB comme base de données pour stocker les données des livres et des utilisateurs.

## Fonctionnalités

- Inscription et connexion des utilisateurs.
- Authentification JWT pour sécuriser les routes API.
- CRUD pour les livres : les utilisateurs peuvent ajouter, lire, mettre à jour et supprimer des informations sur les livres.
- Recherche de livres par titre, auteur ou genre.
- Upload et traitement d'images de couvertures de livres avec Multer et Sharp.

## Technologies Utilisées

- Node.js
- Express
- MongoDB avec Mongoose
- JSON Web Token (JWT) pour l'authentification
- Multer pour le téléchargement des fichiers
- Sharp pour le traitement des images

## Installation

Pour installer et exécuter cette API localement, suivez ces étapes :

Cloner le dépôt :

git clone https://github.com/SLouka06/Projet_7.git

Installez ensuite toutes les dépendances nécessaires en exécutant :

npm install

Configuration

Avant de démarrer l'application, vous devez configurer les variables d'environnement. 
Créez un fichier .env dans le répertoire racine du projet et ajoutez-y les informations suivantes :

# Connexion à la base de données MongoDB
DB_URI=mongodb://localhost:27017/nom_de_votre_base_de_donnees

# Port sur lequel l'API sera accessible
PORT=3000

# Clé secrète pour le chiffrement JWT
SECRET_JWT=votre_cle_secrete

Démarrage de l'Application

Pour démarrer le backend :

cd backend
nodemon server

Pour démarrer le frontend :

cd ../frontend
npm run start

Mise en Place de la Base de Données MongoDB avec MongoDB Atlas

Vous pouvez utiliser MongoDB Atlas, un service cloud qui vous permet de gérer vos bases de données MongoDB dans le cloud. Voici les étapes pour configurer et utiliser MongoDB Atlas :

Création d'un Compte MongoDB Atlas
Rendez-vous sur le site de MongoDB Atlas.
Créez un compte ou connectez-vous si vous en avez déjà un.
Suivez les instructions pour configurer votre cluster MongoDB. Dans le cadre d'un projet de développement, le plan gratuit devrait suffire.
Configuration du Cluster
Une fois connecté, créez un nouveau cluster en sélectionnant le plan gratuit.
Choisissez un fournisseur de services cloud et une région. Il est généralement recommandé de choisir la région la plus proche de vous ou de vos utilisateurs.
Attendez que le cluster soit créé. Cela peut prendre quelques minutes.
Configuration de la Base de Données
Dans le tableau de bord de MongoDB Atlas, accédez à la section 'Database Access' pour créer un nouvel utilisateur de base de données. Notez le nom d'utilisateur et le mot de passe, car vous en aurez besoin pour la chaîne de connexion.
Allez dans 'Network Access' et configurez les adresses IP autorisées à se connecter à votre base de données. Pour un environnement de développement, vous pouvez autoriser l'accès depuis n'importe quelle adresse IP.
Connexion à Votre Application
Dans le tableau de bord de MongoDB Atlas, sélectionnez 'Connect' sur votre cluster, puis 'Connect your application'.
Copiez la chaîne de connexion fournie.
Remplacez <password> par le mot de passe de l'utilisateur de la base de données que vous avez créé, et ajustez le nom de la base de données si nécessaire.
Ajoutez cette chaîne de connexion à votre fichier .env ou dans votre code lors de l'initialisation de Mongoose ou de votre client MongoDB :

DB_URI=votre_chaine_de_connexion_mongodb_atlas
