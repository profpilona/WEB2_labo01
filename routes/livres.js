// fichier des routes dont le préfixe /api/livres
// Date: 29 juin 2023
// alain Pilon

const express = require('express');
const router = express.Router();
const Livres = require('../modeles/Livres');

router.get('/', (requete, reponse)=>{
    Livres.find({}).sort({date: -1}).limit(250).exec()
        .then(livres=>reponse.json(livres))
        .catch(err=>{throw err});
});

router.get('/isbn/:isbn', (requete, reponse)=>{
    let isbn = requete.params.isbn;
    Livres.find({"_id": isbn}).exec()
        .then(livres=>reponse.json(livres))
        .catch(err=>{throw err});
});

router.get('/titre/:titre', (requete, reponse)=>{
    let titre = requete.params.titre;
    Livres.getLivresParChamp("titre", titre, (err, livres)=>{
        if (err) throw err;
        reponse.json(livres);
    }, 25);
});
router.get('/auteur/:auteur', (requete, reponse)=>{
    let auteur = requete.params.auteur;
    Livres.getLivresParChamp("auteur", auteur, (err, livres)=>{
        if (err) throw err;
        reponse.json(livres);
    }, 25);
});
router.get('/resume/:resume', (requete, reponse)=>{
    let resume = requete.params.resume;
    Livres.getLivresParChamp("resume", resume, (err, livres)=>{
        if (err) throw err;
        reponse.json(livres);
    }, 25);
});
router.post('/', (requete, reponse)=>{
    let livre = requete.body;
    // console.log(livre);
    Livres.create(livre)
        .then(msgRetour=>reponse.json(msgRetour))
        .catch(err=>{throw err});
});
router.put('/:isbn', (requete, reponse)=>{
    // à compléter par les étudiants
    let isbn = requete.params.isbn;
    let nouveauLivre = requete.body;
    Livres.modifierLivre(isbn, nouveauLivre, (err, resultat)=>{
        if (err) throw err;
        reponse.json(resultat);
    });
});
router.delete('/:isbn', (requete, reponse)=>{
    let isbn = requete.params.isbn;
    //console.log(isbn, 'a supprimer');
    Livres.deleteOne({"_id": isbn})
        .then(resultat=>reponse.json(resultat))
        .catch(err=>{throw err});
});
module.exports = router;