// fichier des routes dont le préfixe /
// Date: 29 juin 2023
// alain Pilon

const express = require('express');
const router = express.Router();

router.get('/', (requete, reponse)=>{
    reponse.send('SVP, utilisez /api/livres pour obtenir des livres!');
});

router.get('/test.html', (requete, reponse)=>{
    const fs = require('fs');
    const path = require('path');
    let filename = path.join(__dirname, '..', 'test.html');
    console.log(filename);
    fs.readFile( filename, (err, contenu)=>{
        if (err) {
            reponse.status(500).send(`Erreur du serveur: ${err.code}`);
        } else {
            reponse.status(200).set({'Content-type': 'text/html'}).send(contenu);
        }
    });
});

router.get('/aide', (requete, reponse) => {
    reponse.send('Vous etes dans la page /aide...');
});

router.get('/index.html', (requete, reponse)=> {
    reponse.send('Vous etes dans la page index.html');
})

module.exports = router;