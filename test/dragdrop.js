//let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];

//let utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte')) || {};
/*if (utilisateurConnecte.équipe1 === undefined) {
    console.log('rien');
    let equipe1 = [{}];
    utilisateurConnecte.push(equipe1);
    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte));
  }*/


// Ajout de l'écouteur d'événement pour le drag-and-drop
/*document.querySelectorAll(".pokemon").forEach(pokemon => {
    pokemon.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", this.dataset.id);
    });
});

// Ajout de l'écouteur d'événement pour déposer un pokémon dans l'équipe
document.getElementById("team").addEventListener("drop", function(event) {
    event.preventDefault();
    
    var pokemonId = event.dataTransfer.getData("text/plain");
    // Récupération des informations du pokémon
    console.log(pokemonId);
    /*fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
    .then(response => response.json())
    .then(pokemon => {
        // Ajout du pokémon à l'équipe
        var li = document.createElement("li");
        li.classList.add("pokemon");
        li.innerHTML = pokemon.name;
        document.getElementById("team").appendChild(li);
    });
});*/
function dragstart_handler(ev) {
    console.log(ev);

    ev.dataTransfer.setData("text/plain", ev.target.dataset.id);

}
function dragover_handler(ev) {
    ev.preventDefault();
    console.log("hover");

}



function drop_handler(ev) {
    
    ev.preventDefault();
    console.log("salut");
    var pokemonId = ev.dataTransfer.getData("text/plain");

    console.log(pokemonId);
    
    console.log(utilisateurConnecte.equipes);

    let updateUtilisateur = localStorage.getItem('utilisateurConnecte');
    updateUtilisateur = JSON.parse(updateUtilisateur);
    console.log(updateUtilisateur);
    
    updateUtilisateur.equipes.equipe1.push(pokemonId);
    console.log(updateUtilisateur);

    localStorage.setItem("utilisateurConnecte", JSON.stringify(updateUtilisateur));

    showPokeTeam();

}

console.log(utilisateurConnecte.equipes.equipe1.lenght);
function getTeamLenght(){
    let i = 0;
    while(utilisateurConnecte.equipes.equipe1[i]){
        i++
    }
    return i;
    
}

function getPokeId(i){
    pokeId = utilisateurConnecte.equipes.equipe1[i];
    return pokeId;
}

function showPokeTeam(){
    
    len = getTeamLenght();
    for (let i =0; i < len; i++){

        id = getPokeId(i);

        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(response => response.json())
        .then(pokemon => {
        // Ajout du pokémon à l'équipe
            var li = document.createElement("li");
            li.classList.add("pokemon");
            li.innerHTML = pokemon.name;
            document.getElementById("team").appendChild(li);
        });
    }

}
showPokeTeam();


   // Const showPokemon dans PokéAPI.JS =

   /*
const showPokemon = async (pokemon) => {
    first_gen.innerHTML += 
        `
        <form action="pokemon.html" method="get">
            <input id="id" name="id" type="hidden" value=${pokemon.id}>
            <div ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" class="pokemon flex flex-col items-center" onclick="javascript:this.parentNode.submit()">
                <h2>N°${pokemon.id} ${pokemon.name}</h2>
                <img ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" data-id="${pokemon.name}" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${pokemon.name}">
            </div>
        </form>
        `
}*/