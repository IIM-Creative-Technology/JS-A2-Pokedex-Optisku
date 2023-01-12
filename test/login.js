

// tableau pour stocker les utilisateurs inscrits
var utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];

var utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte')) || {};

console.log(utilisateurConnecte.name);

//console.log(utilisateurs);

function inscription() {
  // récupération des valeurs saisies dans le formulaire
  var sign_name = document.getElementById("sign_name").value;
  var sign_password = document.getElementById("sign_password").value;

  // vérification que l'utilisateur n'est pas déjà inscrit
  if (utilisateurs.indexOf(sign_name) != -1) {
    alert("Ce nom d'utilisateur est déjà pris, merci d'en choisir un autre.");
    return;
  }

  // création de l'objet utilisateur
  var utilisateur = {
    "name": sign_name,
    "password": sign_password
  };

  // ajout de l'utilisateur dans le tableau
  utilisateurs.push(utilisateur);

  // Stockage des utilisateurs dans le local storage
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

  // affichage d'un message de confirmation
  alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
}

function connexion() {
  // récupération des valeurs saisies dans le formulaire
  var log_name = document.getElementById("log_name").value;
  var log_password = document.getElementById("log_password").value;

  // vérification que l'utilisateur est inscrit
  var utilisateur = utilisateurs.find(function(user) {
    return user.name === log_name;
  });
  if (utilisateur === undefined) {
    alert("Cet utilisateur n'est pas inscrit, merci de vous inscrire.");
    return;
  }

  // vérification que le mot de passe est correct
  if (utilisateur.password !== log_password) {
    alert("Mot de passe incorrect, veuillez réessayer.");
    return;
  }

// mise à jour de l'objet pour stocker l'utilisateur connecté
utilisateurConnecte = utilisateur;

// Stockage de l'utilisateur connecté dans le local storage
localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte));

  // mise à jour de l'élément pour afficher le nom de l'utilisateur connecté
  document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, " + utilisateur.name + ".";

}

function deconnexion() {
    // vidage de l'objet utilisateurConnecte
    utilisateurConnecte = Object.assign({});
  
    // mise à jour de l'élément pour afficher le nom de l'utilisateur connecté
    document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, utilisateur non connecté.";
}
if(utilisateurConnecte === undefined){
    document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, utilisateur non connecté.";
}else{
    document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, " + utilisateurConnecte.name + ".";
}



