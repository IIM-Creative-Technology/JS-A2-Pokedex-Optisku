// tableau pour stocker les utilisateurs inscrits
let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [] 

let utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte')) || [] 

//console.log(utilisateurs) 

function inscription() {
  // récupération des valeurs saisies dans le formulaire
  let sign_name = document.getElementById("sign_name").value 
  let sign_password = document.getElementById("sign_password").value 

  // vérification que l'utilisateur n'est pas déjà inscrit
  
  for (let user in utilisateurs) {
    console.log(utilisateurs[user].name) 
    if (utilisateurs[user].name === sign_name){
      alert("Ce nom d'utilisateur est déjà pris, merci d'en choisir un autre.") 
    return 
    }
}

  // création de l'objet utilisateur
  let utilisateur = {
    "name": sign_name,
    "password": sign_password,
    "equipes" : {
      "equipe1": [],
      "equipe2": [],
      "equipe3": [],
      "equipe4": [],
      "equipe5": [],
      "equipe6": []
    }
  } 

  // ajout de l'utilisateur dans le tableau
  utilisateurs.push(utilisateur) 

  // Stockage des utilisateurs dans le local storage
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs)) 

  // affichage d'un message de confirmation
  alert("Inscription réussie ! Vous pouvez maintenant vous connecter.") 
}

function connexion() {
  // récupération des valeurs saisies dans le formulaire
  let log_name = document.getElementById("log_name").value 
  let log_password = document.getElementById("log_password").value 

  // vérification que l'utilisateur est inscrit
  let utilisateur = utilisateurs.find(function(user) {
    return user.name === log_name 
  }) 
  if (utilisateur === undefined) {
    alert("Cet utilisateur n'est pas inscrit, merci de vous inscrire.") 
    return 
  }

  // vérification que le mot de passe est correct
  if (utilisateur.password !== log_password) {
    alert("Mot de passe incorrect, veuillez réessayer.") 
    return 
  }

// mise à jour de l'objet pour stocker l'utilisateur connecté
  utilisateurConnecte = utilisateur 

// Stockage de l'utilisateur connecté dans le local storage
  localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte)) 

  // mise à jour de l'élément pour afficher le nom de l'utilisateur connecté
  document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, " + utilisateur.name + "." 

  const connectedDiv = document.getElementById('connectedDiv')

  connectedDiv.style.display = "block"
  

}

function deconnexion() {
    // vidage de l'objet utilisateurConnecte
    //utilisateurConnecte = Object.assign({}) 
    
    updateUtilisateur = localStorage.getItem('utilisateurConnecte') 
    updateUtilisateur = JSON.parse(updateUtilisateur) 
    updateUtilisateur = Object.assign({}) 

    localStorage.setItem("utilisateurConnecte", JSON.stringify(updateUtilisateur)) 
    connectedDiv.style.display = "none"
    document.getElementById("nom-utilisateur").innerHTML = "Bienvenue, utilisateur non connecté." 
}


for (let i = 0; i < 6; i++){
  document.getElementById('id_user'+i).value = utilisateurConnecte.name
}

