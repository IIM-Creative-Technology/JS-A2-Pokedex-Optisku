function dragstart_handler(ev) {
    console.log(ev) 

    ev.dataTransfer.setData("text/plain", ev.target.dataset.id) 

}
function dragover_handler(ev) {
    ev.preventDefault() 
    console.log("hover") 

}

function getTeamNumb(ev){
    console.log(ev) 
    console.log(ev.target.id) 
    if(ev.target.id === "team2"){
        return 2 
    }else if(ev.target.id === "team1"){
        return 1 
    }else if(ev.target.id === "team3"){
        return 3 
    }else if(ev.target.id === "team4"){
        return 4 
    }else if(ev.target.id === "team5"){
        return 5 
    }else if(ev.target.id === "team6"){
        return 6 
    } else {
        console.log('error') 
    }
    
}

function getTeamLenght(numb){
    let i = 0 
    if(numb === 1){
        team = utilisateurConnecte.equipes.equipe1 
    }else if(numb === 2){
        team = utilisateurConnecte.equipes.equipe2 
    }else if(numb === 3){
        team = utilisateurConnecte.equipes.equipe3 
    }else if(numb === 4){
        team = utilisateurConnecte.equipes.equipe4 
    }else if(numb === 5){
        team = utilisateurConnecte.equipes.equipe5 
    }else if(numb === 6){
        team = utilisateurConnecte.equipes.equipe6 
    }else{
        console.log('error') 
    }
    
    while(team[i]){
        i++
    }
    return i 
    
}

function getPokeId(i, numb){
    if(numb === 1){
        pokeId = utilisateurConnecte.equipes.equipe1[i] 
    }else if(numb === 2){
        pokeId = utilisateurConnecte.equipes.equipe2[i] 
    }else if(numb === 3){
        pokeId = utilisateurConnecte.equipes.equipe3[i] 
    }else if(numb === 4){
        pokeId = utilisateurConnecte.equipes.equipe4[i] 
    }else if(numb === 5){
        pokeId = utilisateurConnecte.equipes.equipe5[i] 
    }else if(numb === 6){
        pokeId = utilisateurConnecte.equipes.equipe6[i] 
    } else{
        console.log('error') 
    }
    return pokeId 
}

function showPokeTeam(numb){
    
    len = getTeamLenght(numb) 
    //console.log(len) 
    for (let i =0; i < len; i++){

        id = getPokeId(i, numb) 
        //console.log(id) 

        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(response => response.json())
        .then(pokemon => {
        // Ajout du pokémon à l'équipe
            let li = document.createElement("li") 
            li.classList.add("pokemon") 
            li.innerHTML = pokemon.name 
            if(numb === 1){
                document.getElementById("team1").appendChild(li) 
            }else if(numb === 2){
                document.getElementById("team2").appendChild(li) 
            }else if(numb === 3){
                document.getElementById("team3").appendChild(li) 
            }else if(numb === 4){
                document.getElementById("team4").appendChild(li) 
            }else if(numb === 5){
                document.getElementById("team5").appendChild(li) 
            }else if(numb === 6){
                document.getElementById("team6").appendChild(li) 
            }else{
                console.log("error") 
            }
            
        }) 
    }

}

function showAllPokeTeam(){
    let i = 1 
    while(i <= 6){
        showPokeTeam(i) 
        i++ 
    }
}
function clearPokeTeam(numb){
    if(numb === 1){
        team = document.getElementById('team1') 
    }else if(numb === 2){
        team = document.getElementById('team2') 
    }else if(numb === 3){
        team = document.getElementById('team3') 
    }else if(numb === 4){
        team = document.getElementById('team4') 
    }else if(numb === 5){
        team = document.getElementById('team5') 
    }else if(numb === 6){
        team = document.getElementById('team6') 
    }
    
    team.innerHTML="" 
    let h3 = document.createElement("h3") 
    h3.innerHTML= "Team N°" + numb 
    team.appendChild(h3) 
}
function clearAllPokeTeam(){
    let i = 1 
    while(i < 6){
        clearPokeTeam(i) 
        i++ 
    }
}
showAllPokeTeam() 

function drop_handler(ev) {
    ev.preventDefault() 
    console.log(ev) 

    let teamNumb = getTeamNumb(ev) 
    console.log(teamNumb) 
    clearAllPokeTeam() 

    //console.log(ev.target.id) 

    let pokemonId = ev.dataTransfer.getData("text/plain") 

    //console.log(pokemonId) 
    
    //console.log(utilisateurConnecte.equipes) 

    let updateUtilisateur = localStorage.getItem('utilisateurConnecte') 
    updateUtilisateur = JSON.parse(updateUtilisateur) 
    //console.log(updateUtilisateur) 

    
    //console.log(teamNumb) 
    if(teamNumb === 2){
        updateUtilisateur.equipes.equipe2.push(pokemonId) 
    }else if(teamNumb === 1){
        updateUtilisateur.equipes.equipe1.push(pokemonId) 
    }else if(teamNumb === 3){
        updateUtilisateur.equipes.equipe3.push(pokemonId) 
    }else if(teamNumb === 4){
        updateUtilisateur.equipes.equipe4.push(pokemonId) 
    }else if(teamNumb === 5){
        updateUtilisateur.equipes.equipe5.push(pokemonId) 
    }else if(teamNumb === 6){
        updateUtilisateur.equipes.equipe6.push(pokemonId) 
    }else{
        console.log("error") 
    }

    //console.log(utilisateurConnecte) 
    //console.log(updateUtilisateur) 

    localStorage.setItem("utilisateurConnecte", JSON.stringify(updateUtilisateur)) 
    //console.log(utilisateurConnecte) 
    utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte')) || [] 

    //showAllPokeTeam() 
    //clearPokeTeam(teamNumb) 
    
    showAllPokeTeam() 

}
