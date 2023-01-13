let pokemons = []
let url = "https://pokeapi.co/api/v2/pokemon"
let currentGen = "gen1"
let genTitle = document.querySelector('.title')
let pokeContainer = document.querySelector('.pokeContainer')
let pageContent = document.querySelector('.pageContent')

let offset = 1
let limite = 20
let nbr_affiche = 5

let pkm_nbr_1ere = 151
let pkm_nbr_2eme = 100
let pkm_nbr_3eme = 135
let pkm_nbr_4eme = 107
let pkm_nbr_5eme = 156
let pkm_nbr_6eme = 72
let pkm_nbr_7eme = 88
let pkm_nbr_8eme = 96

let currentTypeFilter = document.querySelector('.type-filter')
let currentTypeFilterValue = currentTypeFilter.value
currentTypeFilter.addEventListener("click", function() {
    if(currentTypeFilterValue != currentTypeFilter.value) {
        currentTypeFilterValue = currentTypeFilter.value
        resetInnerHTML()
        genTitle.innerText = generation.value
        fetchPokemons()
    }
})

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
    let number = getRandomArbitrary(1,905)
    resetInnerHTML()
    pokemons = []
    fetchRandom(number)

})

function chooseGen(val) {
    resetInnerHTML()
    genTitle.innerText = generation.value
    fetchPokemons()
    pokeContainer.style.display = 'grid'
    pokeContainer.style.width = '60vw'
    this.form.submit()
}

const fetchRandom = async (id) => {
    await getAllPokemon(id)
    pokemons.forEach(pokemon => {
        showPokemon(pokemon)

        genTitle.innerText = pokemon.name
        pokeContainer.style.display = 'block'
        pokeContainer.style.width = '20%'
    })
    changeToShiny(pokemons)
}

const fetchSearch = async (value) => {
    resetInnerHTML()
    pokemons = []
    await getAllPokemon(value)
    pokemons.forEach(pokemon => {
        showPokemon(pokemon)

        genTitle.innerText = pokemon.name
        pokeContainer.style.display = 'block'
        pokeContainer.style.width = '20%'
    })
    changeToShiny(pokemons)
}

const fetchPokemons = async () => {
    if(generation.value == "1st Generation"){
        pokemons = []
        // for(let i = offset; i <= limite; i++) {
        //     console.log(i)
        //     await getAllPokemon(i)
        // }
        for(let i = 1; i <= pkm_nbr_1ere; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "2nd Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "3rd Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "4th Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "5th Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme; i++) {
            await getAllPokemon(i)
        }
    }else if (generation.value == "6th Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme; i++) {
            await getAllPokemon(i)
        }
    }
    else if (generation.value == "7th Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme + pkm_nbr_7eme; i++) {
            await getAllPokemon(i)
        }
    }
    else if (generation.value == "8th Generation") {
        pokemons = []
        for(let i = pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme + pkm_nbr_7eme + 1; i <= pkm_nbr_1ere + pkm_nbr_2eme + pkm_nbr_3eme + pkm_nbr_4eme + pkm_nbr_5eme + pkm_nbr_6eme + pkm_nbr_7eme + pkm_nbr_8eme; i++) {
            await getAllPokemon(i)
        }
    }
    pokemons.forEach(pokemon => {
        showPokemon(pokemon)
    })
    changeToShiny(pokemons)
    // pokemons[1].moves.forEach(move => {
    //     console.log(move.move.name)
    // })
}

const getAllPokemon = async (id) => {
    // console.log(`${url}/${id}`)
    const result = await fetch(`${url}/${id}`)
    const pokemonAdd = await result.json()
    pokemons.push(pokemonAdd)
}

const showPokemon = async (pokemon) => {
    if(currentTypeFilterValue == "") {
        first_gen.innerHTML += 
        `
        <form action="pokemon.html" method="get">
            <input id="id" name="id" type="hidden" value=${pokemon.id}>
            <div  ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" class="pokemon flex flex-col items-center capitalize font-semibold" onclick="javascript:this.parentNode.submit()">
                <h2>N°${pokemon.id} ${pokemon.name}</h2>
                <img ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${pokemon.name}">
            </div>
        </form>
        `
    }else{
        pokemon.types.forEach(result => {
            if(result.type.name == currentTypeFilterValue){
                first_gen.innerHTML += 
                `
                <form action="pokemon.html" method="get">
                    <input id="id" name="id" type="hidden" value=${pokemon.id}>
                    <div  ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" class="pokemon flex flex-col items-center capitalize font-semibold" onclick="javascript:this.parentNode.submit()">
                        <h2>N°${pokemon.id} ${pokemon.name}</h2>
                        <img ondragstart="dragstart_handler(event)" droppable="true" draggable="true" data-id="${pokemon.name}" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${pokemon.name}">
                    </div>
                </form>
                `
            }
        })
    }
}
    

const changeToShiny = async (pokemons) => {
    pokemons.forEach(pokemon => {
        if(document.querySelector("." + pokemon.name) != null){
            let current = document.querySelector("." + pokemon.name)
            current.addEventListener("mouseenter", function() {
                current.src = `${pokemon.sprites.front_shiny}`
            })
            current.addEventListener("mouseleave", function() {
                current.src = `${pokemon.sprites.front_default}`
            })
        }
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
//         offset += limite
//         limite += 20
//         fetchPokemons()
//         console.log(offset)
//     }

//     wait(3000)
// };

//     wait(1000)
// };


// Easter egg
const pressed = []
const secretCode = 'battle!'
window.addEventListener('keyup', (e) => {
//   console.log(e.key)
  pressed.push(e.key)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
  if (pressed.join('').includes(secretCode)) {
    window.location.href ="https://play.pokemonshowdown.com/"
  }
})


// Search bar
let searchBar = document.querySelector('.searchBar')
let searchTextValue = ""
searchBar.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        searchTextValue += e.key
    }
    if( e.keyCode == 8 || e.keyCode == 46 )
        searchTextValue = searchTextValue.slice(0, -1);
    if(e.key === "Enter")
        fetchSearch(searchTextValue)
    console.log(searchTextValue)
})

