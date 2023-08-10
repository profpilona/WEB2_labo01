// schéma de données pour les Usagers
// Date: 29 juin 2023
// Alain Pilon

const mongoose = require('mongoose');

let schemaUsagers = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

let Users = module.exports = mongoose.model('usagers', schemaUsagers);

// fonction pour obtenir tous les usagers de la collection
// reçoit en paramètre un callback et le nombre maximum (limit) de usagers à retourner
module.exports.getUsers = (callback, limit) => {
    Users.find(callback).limit(limit);
}

// fonction pour obtenir tous les usagers de la collection qui correspondent à l'_id
// reçoit en paramètre un identifiant, une fonction callback et le nombre maximum (limit) de usagers à retourner
module.exports.getUsersParId = (_id, callback, limit) => {
    let filtre = {"_id": _id};
    Users.find(filtre, callback).limit(limit);
}

// fonction pour obtenir tous les usagers de la collection qui contiennent une partie d'un champ
// reçoit en paramètre le champ, les caractères à chercher dans le champ, une fonction callback et le nombre maximum (limit) de livres à retourner
module.exports.getUsersParChamp = (champ, critere, callback, limit) => {
    let filtre = {[champ]: RegExp(critere, "i")};
    console.log(filtre);
    Users.find(filtre, callback).limit(limit);
}

// fonction pour ajouter un usager dans la collection
// reçoit en paramètre l'usager à ajouter et une fonction callback
module.exports.ajoutUser = (usager, callback) => {
    // validation du format de l'usager reçu en paramètre
    // ajout d'un _id unique obligatoire...
    usager._id = new mongoose.Types.ObjectId();
    Users.create(usager, callback);
}

// fonction pour modifier un usager dans la collection
// reçoit en paramètres:
// - l'identifiant de l'usager à modifier
// - l'usager à modifier (les nouvelles valeurs) et 
// - une fonction callback
module.exports.modifierUser = (_id, usager, callback) => {
    // validation du format de l'usager reçu en paramètre (plus tard)
    let filtre = {"_id": _id};
    let options = {};
    let nouveauUser = {
        "nom": usager.nom,
        "pwd": usager.pwd,
        "login": usager.login,
        "date": usager.date
    };
    Users.findOneAndUpdate(filtre, nouveauUser, options, callback);
};
// fonction pour supprimer un usager de la collection
// reçoit en paramètres:
// - l'identifiant de l'usager à supprimer 
// - une fonction callback
module.exports.supprimerUser = (_id, callback) => {
    let filtre = {"_id": _id};
    Users.deleteOne(filtre, callback);
}