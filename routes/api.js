// On importe les composants de la route dont express et body-parser
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// On importe les composants de mongodb afin de pouvoir y accéder en ayant bien prêté attention d'avoir préalablement téléchargé ses modules dans le dossier node-modules
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
//const mongodbUrl = process.env.MONGO_HOST;


// On configure mongoose et le serveur mongo
const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27017/my-recipes';


// On configure body-parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));



// On configure et définit les routes
router.get( '/', (req, res)=>{
    // On renvoit un flux JSON dans la réponse
    res.json({content: 'Hello from API'});
} );




// On définit une nouvelle route pour accéder à la collection de notre BDD MongoDB
// On affiche la liste des recettes
router.get( '/my-recipes', (req, res) => {
   
    //On se connecte au serveur de MongoDb configuré plus haut
    mongoose.connect(mongoServeur, (err, db)=>{
        //On teste la connexion
        if(err){ res.json({error: err}) }
        else{
            //Connexion ouverte : On récupère la collection de données
            db.collection('recipes').find().toArray( (err, collection)=>{

                //On teste la connexion de la collection
                if(err){res.json({error:err})}
                else{
                    //Collection récupérée
                    res.json(collection);
                }
            } )
        };

        // On ferme la connexion
        db.close();

    })

});


// On configure et définit une route pour l'ajout de recette
router.post('/add-recipe', (req,res)=>{
    console.log(req.body);
    mongoose.connect(mongoServeur, (err, db)=>{
        // On teste la connexion
        if(err){ res.render('add-recipe', {msg:err}) }
        else{
            //Connexion ouverte : ajouter les données dans la BDD
            db.collection('recipes').insert({ 
                title: req.body.title,
                content: req.body.content,
               ingredients:req.body.ingredients}, (err, newObject)=>{
                // On vérifie l'ajout
                if(err){res.redirect(500,'/') }
                else{
                    res.redirect(301, '/')
                }
            })
        };

        //Fermer la connexion
        db.close();

    })
})


router.get( '/details/:id', (req, res) => {
    // On renvoie le fichier index dans la réponse
    console.log(req.params.id);
     // On se connecte à la base de données MongoDB
     mongoose.connect(mongoServeur, (err, db)=>{
         // On teste la connexion
         if(err){ res.json({error: err}) }
         else{
             // Connexion ouverte : récupérer la collection de données
             db.collection('recipes').find({ 
                _id: new ObjectId(req.params.id)
               }).toArray( (err, collection)=>{
 
                 // On teste la collection de données
                 if(err){res.render('details',{error:err})}
                 else{
                     //Collection récupérée
                     //res.json(collection);
                        console.log(collection);
                         // Collection récupérée :Renvoyer le fichier index dans la réponse avec la collection
                        res.render('details',{data:collection});
                 }
             })
         };
 
         //Fermer la connexion
         db.close();
 
     })
 
 });


// On crée une nouvelle route api pour supprimer un article
router.post('/suppr/:id', (req,res)=>{
    console.log(req.params.id);
    mongoose.connect(mongoServeur, (err, db)=>{
        // On teste la connexion
        if(err){ res.render('suppr', {msg:err}) }
        else{
            // Connexion ouverte : supprimer les données dans la BDD
            db.collection('recipes').remove({ 
                _id: new ObjectId(req.params.id)
                }, (err, newObject)=>{
                // On vérifie LA SUPPRESSION
                if(err){res.redirect(500,'/') }
                else{
                    res.redirect(301,'/')
                }
            })
        };

        //Fermer la connexion
        db.close();

    })
})




// On exporte le module de routes
module.exports = router;