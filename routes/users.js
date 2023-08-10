// fichier des routes dont le préfixe /api/users
// Date: 29 juin 2023
// alain Pilon

const express = require('express');
const router = express.Router();
const Users = require('../modeles/Users');

router.get('/', (requete, reponse)=>{
    Users.getUsers((err, usagers)=>{
        if (err) throw err;
        reponse.json(usagers);
    }, 25);
});

router.get('/_id/:_id', (requete, reponse)=>{
    let _id = requete.params._id;
    Users.getUsersParId(_id, (err, users)=>{
        if (err) throw err;
        reponse.json(users);
    }, 25);
});

router.get('/nom/:nom', (requete, reponse)=>{
    let nom = requete.params.nom;
    Users.getUsersParChamp("nom", nom, (err, users)=>{
        if (err) throw err;
        reponse.json(users);
    }, 25);
});

router.get('/login/:login', (requete, reponse)=>{
    let login = requete.params.login;
    Users.getUsersParChamp("login", login, (err, users)=>{
        if (err) throw err;
        reponse.json(users);
    }, 25);
});

router.post('/', (requete, reponse)=>{
    let usager = requete.body;
    Users.ajoutUser(usager, (err, msgRetour)=>{
        if (err) throw err;
        reponse.json(msgRetour);
    });
});
router.put('/:_id', (requete, reponse)=>{
    let _id = requete.params._id;
    let nouveauUser = requete.body;
    Users.modifierUser(_id, nouveauUser, (err, resultat)=>{
        if (err) throw err;
        reponse.json(resultat);
    });
});
router.delete('/:_id', (requete, reponse)=>{
    let _id = requete.params._id;
    Users.supprimerUser(_id, (err, resultat)=>{
        if (err) throw err;
        reponse.json(resultat);
    });
});
module.exports = router;