// On importe les composants de la route
const express = require('express');
const router = express.Router();

// On configure et définit les routes
router.get( '/', (req, res)=>{
    //Renvoyer le fichier index dans la réponse
    res.render('index');
} );

// On exporte le module de routes
module.exports = router;