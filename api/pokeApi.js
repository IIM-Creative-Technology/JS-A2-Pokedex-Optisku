let pokemons = []
let url = "https://pokeapi.co/api/v2/pokemon"
let currentGen = 1
let pkm_nbr_1ere = 151
let pkm_nbr_2eme = 100

let first_gen = document.querySelector('.first-gen')
let nextGenButton = document.querySelector('.next-gen')

function resetInnerHTML() {
    first_gen.innerHTML = ``
}

nextGenButton.addEventListener("click", function(){
    if(currentGen == 1) {
        document.querySelector('.title').innerText = "2eme gen"
        currentGen = 2
        fetchPokemons()
    }else if (currentGen == 2) {
        document.querySelector('.title').innerText = "1ere gen"
        currentGen = 1
        fetchPokemons()
    }
})

const fetchPokemons = async () => {
    if(currentGen == 1){
        pokemons = []
        resetInnerHTML()
        for(let i = 1; i <= pkm_nbr_1ere; i++) {
            await getAllPokemon(i)
        }
    }else {
        console.log('in it')
        pokemons = []
        resetInnerHTML()
        for(let i = 1; i <= pkm_nbr_2eme; i++) {

            await getAllPokemon(i+151)
        }
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
        first_gen.innerHTML += 
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
        first_gen.innerHTML +=
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