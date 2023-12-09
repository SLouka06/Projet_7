require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOrigin);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(process.env.IMAGES_ROUTE, express.static(path.join(__dirname, 'images')));
app.use(process.env.BOOKS_ROUTE, booksRoutes);
app.use(process.env.AUTH_ROUTE, userRoutes);


module.exports = app;
