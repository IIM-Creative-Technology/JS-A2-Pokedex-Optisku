let pokemons = []
let url = "https://pokeapi.co/api/v2/pokemon"
let pkm_nbr = 151

const fetchPokemons = async () => {
    for(let i = 1; i <= pkm_nbr; i++) {
        await getAllPokemon(i)
    }
    pokemons.forEach((pokemon) =>
        console.log(pokemon)
    )
}

const getAllPokemon = async (id) => {
    // console.log(fetch(`${url}/${id}`))
    const result = await fetch(`${url}/${id}`)
    const pokemonAdd = await result.json()
    pokemons.push(pokemonAdd)
}

const showPokemon = async (link) => {
    for(let i = 1; i <= pkm_nbr; i++) {
        await getAllPokemon(i)
    }
}
fetchPokemons()