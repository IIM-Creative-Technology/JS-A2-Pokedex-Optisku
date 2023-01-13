let pokemons = []
let url = "https://pokeapi.co/api/v2/pokemon"
let currentGen = "gen1"

let offset = 0
let nbr_affiche = 5

let pkm_nbr_1ere = 151
let pkm_nbr_2eme = 100
let pkm_nbr_3eme = 135
let pkm_nbr_4eme = 107
let pkm_nbr_5eme = 156
let pkm_nbr_6eme = 72

let first_gen = document.querySelector('.first-gen')
let generation = document.querySelector('.generation')

function resetInnerHTML() {
    first_gen.innerHTML = ``
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
let randomBtn = document.querySelector('.random')
randomBtn.addEventListener('click', function(){
    let number = getRandomArbitrary(1,721)
    resetInnerHTML()
    pokemons = []
    fetchRandom(number)

})
// console.log(getRandomArbitrary(1,721))


function chooseGen(val) {
    if(this.value != 0){ 
        resetInnerHTML()
        document.querySelector('.title').innerText = generation.value
        fetchPokemons()
        this.form.submit()
    }
}


const fetchRandom = async (id) => {
    await getAllPokemon(id)
    pokemons.forEach(pokemon => {
        console.log('init')
        showPokemon(pokemon)
    })
    changeToShiny(pokemons)
}

const fetchPokemons = async () => {
    if(generation.value == "gen1"){
        pokemons = []
        for(let i = 1; i <= pkm_nbr_1ere; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "gen2") {
        pokemons = []
        for(let i = pkm_nbr_1ere + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "gen3") {
        pokemons = []
        console.log('init')
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "gen4") {
        pokemons = []
        console.log('init')
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "gen5") {
        pokemons = []
        console.log('init')
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "gen6") {
        pokemons = []
        console.log('init')
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme; i++) {
            await getAllPokemon(i)
        }
    }
    pokemons.forEach(pokemon => {
        showPokemon(pokemon)
    })
    changeToShiny(pokemons)
    // console.log(pokemons[3])
}

const getAllPokemon = async (id) => {
    console.log(`${url}/${id}`)
    const result = await fetch(`${url}/${id}`)
    const pokemonAdd = await result.json()
    pokemons.push(pokemonAdd)
}

/*const showPokemon = async (pokemon) => {
    if(typeof pokemon.types[1] != "undefined"){ 
        first_gen.innerHTML += 
            `
            <form action="pokemon.html" method="get">
                <input id="id" name="id" type="hidden" value=${pokemon.id}>
                <div class="pokemon" onclick="javascript:this.parentNode.submit()">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                    <div class="types">
                        <h3>${pokemon.types[0].type.name}</h3>
                        <h3>${pokemon.types[1].type.name}</h3>
                    </div>
                </div>
            </form>
            `
    }else {
        first_gen.innerHTML +=
            `
            <form action="pokemon.html" method="get">
                <input id="id" name="id" type="hidden" value=${pokemon.id}>
                <div class="pokemon" onclick="javascript:this.parentNode.submit()">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                    <div class="types">
                        <h3>${pokemon.types[0].type.name}</h3>
                    </div>
                </div>
            </form>
            `
    }
}*/

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
}

const changeToShiny = async (pokemons) => {
    console.log(pokemons)
    pokemons.forEach(pokemon => {
        let current = document.querySelector("." + pokemon.name)
        console.log(current)
        current.addEventListener("mouseenter", function() {
            current.src = `${pokemon.sprites.front_shiny}`
        })
        current.addEventListener("mouseleave", function() {
            current.src = `${pokemon.sprites.front_default}`
        })
    })
}

fetchPokemons()

function wait(ms) {
    return new Promise( resolve => {

        setTimeout(() => {resolve('')}, ms )
    })
}

// window.onscroll = function() {
//     if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
//         offset += 20
//         fetchPokemons()
//     }
//     wait(1000)
// };