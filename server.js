/*
    Importation des dépendances
*/

    // On importe les dépendances dans le fichier server.js afin de pouvoir les utiliser
    //Composants
    const express =  require('express');
    const path = require('path');
    const ejs = require('ejs');


    // On importe la route front et la route api dans ce fichier et on les placent dans une constante pour pouvoir les réutiliser
    //Modules
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');

//



/*
    Initialisation du serveur
*/

    // On initialise le serveur et on lui spécifie un port sur lequel on fera tourner l'application
    const app = express();
    const port = process.env.PORT || 8000;

    // On configure le dossier des vues clients en spécifiant le nom qu'il aura, ici : www-ejs, on pourra changer pour www-html
    app.set('views',__dirname + '/www-ejs');
    app.use( express.static(path.join(__dirname, 'www-ejs')) );

    // On définit le moteur de rendu

        //app.engine( 'html', ejs.renderFile );
        app.set( 'view engine', 'ejs' );

        //On change le moteur du rendu pour qu'il serve du HTML
        //app.set( 'view engine', 'html' );

    //

    // On configure le serveur afin de lui dire d'utiliser frontRoute pour l'adresse '/', pareil pour la route api
    app.use('/', frontRoute);
    app.use('/api', apiRoute);

//


/*
    Lancement du serveur
*/

    //Permet d'écouter le serveur sur le port spécifié et donc de le lancer
    app.listen(port, ()=>console.log(`Le serveur est lancé sur le port ${port}`))

//
