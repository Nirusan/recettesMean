// On importe les composants de la route
const express = require('express');
const router = express.Router();

/**
 * 
 * Configuration de Mongoose
 */

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//


// On configure et définit les routes
router.get( '/', (req, res) => {
    // On renvoit le fichier index dans la réponse
    
     //On se connecte à la base de données mongoDB
     mongoose.connect(mongoServeur, (err, db)=>{
         //Test de connexion
         if(err){ res.json({error: err}) }
         else{
             //Connexion ouverte : récupérer la collection de données
             db.collection('recipes').find().toArray( (err, collection)=>{
 
                 //tester la connexion de la collection
                 if(err){res.render('index',{error:err})}
                 else{
                     //Collection récupérée
                     //res.json(collection);

                         // Collection récupérée :Renvoyer le fichier index dans la réponse avec la collection
                        res.render('index',{data:collection});
                 }
             } )
         };
 
         //Fermer la connexion
         db.close();
 
     })
 
 });



//On crée une route pour ajouter des recettes, le render va nous afficher la page "add-recipe.ejs" étant donné que le moteur de vue est fixé sur les fichiers ejs du dossier www-ejs
router.get('/add-recipe',(req, res)=>{
    res.render('add-recipe');
});

// On exporte le module de routes
module.exports = router;