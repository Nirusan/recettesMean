// On importe les dépendances dans le fichier server.js afin de pouvoir les utiliser

const express =  require('express');
const path = require('path');
const ejs = require('ejs');
// On importe la route front dans ce fichier et on la place dans une constante pour pouvoir la réutiliser
const frontRoute = require('./routes/front');

// On initialise le serveur et on lui spécifie un port sur lequel on fera tourner l'application
const app = express();
const port = process.env.PORT || 8000;

// On configure le dossier des vues clients en spécifiant le nom qu'il aura, ici : www-ejs
app.set('views',__dirname + '/www-ejs');
app.use( express.static(path.join(__dirname, 'www-ejs')) );

// On définit le moteur de rendu
//app.engine( 'html', ejs.renderFile );
app.set( 'view engine', 'ejs' );

// On configure le serveur afin de lui dire d'utiliser frontRoute pour l'adresse '/'
app.use('/', frontRoute);



//Permet d'écouter le serveur sur le port spécifié et donc de le lancer
app.listen(port, ()=>console.log(`Le serveur est lancé sur le port ${port}`))
