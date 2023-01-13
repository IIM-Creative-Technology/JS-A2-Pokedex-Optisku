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

    let hhh = localStorage.getItem('');
    hbh = JSON.parse(hhh);
    console.log(hbh);

    if (utilisateurConnecte.equipes.equipe1 === undefined) {
        console.log('rien');
        let rebuildUser = {
            "name": utilisateurConnecte.name,
            "password": utilisateurConnecte.password,
            "equipe1": {}
        }
        utilisateurConnecte = rebuildUser;
        localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte));
        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurConnecte));
        

    }

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
    .then(response => response.json())
    .then(pokemon => {
        // Ajout du pokémon à l'équipe
        var li = document.createElement("li");
        li.classList.add("pokemon");
        li.innerHTML = pokemon.name;
        document.getElementById("team").appendChild(li);
    });
   }


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