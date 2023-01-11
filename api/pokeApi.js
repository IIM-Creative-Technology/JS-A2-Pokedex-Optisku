let pokemons = []
let url = "https://pokeapi.co/api/v2/pokemon"
let pkm_nbr = 151

let container = document.querySelector('.container')

const fetchPokemons = async () => {
    for(let i = 1; i <= pkm_nbr; i++) {
        await getAllPokemon(i)
    }
    pokemons.forEach(pokemon => {
        showPokemon(pokemon)
    })
    console.log(pokemons[3])
}

const getAllPokemon = async (id) => {
    // console.log(fetch(`${url}/${id}`))
    const result = await fetch(`${url}/${id}`)
    const pokemonAdd = await result.json()
    pokemons.push(pokemonAdd)
}

const showPokemon = async (pokemon) => {
    if(typeof pokemon.types[1] != "undefined"){ 
        container.innerHTML += 
            `
            <div class="pokemon">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <div class="types">
                    <h3>${pokemon.types[0].type.name}</h3>
                    <h3>${pokemon.types[1].type.name}</h3>
                </div>
            </div>
            `
    }else {
        container.innerHTML +=
            `
            <div class="pokemon">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <div class="types">
                    <h3>${pokemon.types[0].type.name}</h3>
                </div>
            </div>
            `
    }
}
fetchPokemons()