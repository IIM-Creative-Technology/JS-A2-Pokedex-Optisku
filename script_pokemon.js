const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
FetchAPIPokemon();



function FetchAPIPokemon(){
    if(urlParams.has('id')){
        const id = urlParams.get('id')
        fetch('https://pokeapi.co/api/v2/pokemon/'+id).then(response => response.json()).then(response =>{
        // console.log(response)
        DisplayImagePokemon(response);
        changeToShinySingle(response)
        GetTypes(response.types);
        Getinfo(response)
        GetStats(response.stats);
        WeightAndHeight(response)
        getAttackMoves(response)
    })
    };
    
}

const getAttackMoves = async (response) => {
    let stop = 0
    let fetchstop = 0
    let div = document.querySelector('.attack-moves')
    console.log(response.moves[8])
    response.moves.forEach(move => {
        if(stop < 10) {
            div.innerHTML += `<p class="${move.move.name}">${move.move.name}</p>`
            stop++
        }
        fetch(move.move.url).then(response => response.json()).then(response =>{
            if(fetchstop < 10) {
                getAttackMovesDetails(response)
                fetchstop++
            }
        })
    })
}

const getAttackMovesDetails = async (response) => {
    let p = document.querySelector('.' + response.name)
    p.innerHTML += `<p class="py-2 px-4 border-2 border-black rounded-full" id="${response.id}">${response.type.name}</p>`
    let type = document.getElementById(response.id)
    typesColors(type)
}

function Getinfo(response){
    document.title = response.name + " - Pokédex" 
    div_info = document.getElementsByClassName('pokemon_info')[0]
    let pokeTitle = document.querySelector('.title')
    pokeTitle.innerText = "N°"+response.id + ' ' + response.name
    
}
const changeToShinySingle = async (pokemons) => {
    // console.log(pokemons)
        let current = document.getElementsByClassName('pokemon_image_url')[0]
        // console.log(current)
        current.addEventListener("mouseenter", function() {
            current.src = `${pokemons.sprites.front_shiny}`
        })
        current.addEventListener("mouseleave", function() {
            current.src = `${pokemons.sprites.front_default}`
        })
}

function DisplayImagePokemon(response){
        let div_image = document.getElementsByClassName('pokemon_image')[0]
        let newimage = document.createElement("img")
        newimage.src = response.sprites.front_default
        newimage.className ='w-60 h-auto pokemon_image_url'
        div_image.appendChild(newimage);
}
function WeightAndHeight(response){
    let div_wh = document.getElementsByClassName('pokemon_wh')[0]
    let weight = document.createElement("p")
    let height = document.createElement("p")
    weight.textContent += "Weight: " + response.weight + " lbs"
    height.textContent += "Height: " + response.height + " ft"
    div_wh.appendChild(weight)
    div_wh.appendChild(height)
}
function typesColors(e){
    if(e.textContent == "grass"){
        e.style.backgroundColor = 'green'
    } else if (e.textContent == "poison"){
        e.style.backgroundColor = '#a2589e'
    }else if (e.textContent == "normal"){
        e.style.backgroundColor = '#b9b9ad'
    }else if (e.textContent == "psychic"){
        e.style.backgroundColor = '#f15ab5'
    }else if (e.textContent == "ground"){
        e.style.backgroundColor = '#e8cc56'
    }else if (e.textContent == "ice"){
        e.style.backgroundColor = '#a7f3ff'
    }else if (e.textContent == "fire"){
        e.style.backgroundColor = '#eb4d40'
    }else if (e.textContent == "rock"){
        e.style.backgroundColor = '#caba6d'
    }else if (e.textContent == "dragon"){
        e.style.backgroundColor = '#8a78fb'
    }else if (e.textContent == "water"){
        e.style.backgroundColor = '#6fb0ff'
    }else if (e.textContent == "bug"){
        e.style.backgroundColor = '#c3d000'
    }else if (e.textContent == "dark"){
        e.style.backgroundColor = '#705747'
    }else if (e.textContent == "fighting"){
        e.style.backgroundColor = '#9c573e'
    }else if (e.textContent == "ghost"){
        e.style.backgroundColor = '#7975d6'
    }else if (e.textContent == "steel"){
        e.style.backgroundColor = '#c4c2db'
    }else if (e.textContent == "flying"){
        e.style.backgroundColor = '#86a6f8'
    }else if (e.textContent == "electric"){
        e.style.backgroundColor = '#fadb2b'
    }else if (e.textContent == "fairy"){
        e.style.backgroundColor = '#f0acff'
    }
}
function GetTypes(response){    
    response.forEach(type => {
        let div_types = document.getElementsByClassName('pokemon_type')[0]
        alltypes = document.createElement("p")
        alltypes.textContent += type.type.name
        TypeEffect(type.type.url);
        alltypes.className ="py-2 px-4 border-2 border-black rounded-full"
        div_types.appendChild(alltypes)
        
        typesColors(alltypes)
        
    });
    
}
function TypeEffect(response){
    fetch(response).then(response => response.json()).then(response =>{
        i=0
        // console.log(response)
        damage_relations = response.damage_relations
        for (const [name, damage_relation] of Object.entries(damage_relations)){
        let damage_relation_div = document.getElementsByClassName('DamageRelation')[i]
        GetDamageRelation(damage_relation, damage_relation_div)
        i++
        }
    })
}
function GetDamageRelation(damage_relation,damage_relation_div){
    damage_relation.forEach(type =>{
        let typedamage = document.createElement("p")
        typedamage.textContent += type.name
        damage_relation_div.appendChild(typedamage)
        typedamage.className ="py-2 px-4 border-2 border-black rounded-full"
        typesColors(typedamage)
    });
}
function GetStats(stats){
    i=0
    stats.forEach(stat =>{
        let stat_texte = document.createElement("p")
        let stats_div = document.getElementsByClassName('Stats')[i]
        stat_texte.textContent = stat.base_stat+" "
        stat_texte.textContent += " "+stat.stat.name
        stats_div.appendChild(stat_texte)
        let stat_info = document.createElement("progress")
        stat_info.max = "255"
        stat_info.value = stat.base_stat
        progressbar_color = Getcolor(stat_info.value)
        stat_info.className =  progressbar_color
        stats_div.appendChild(stat_info)
        i++
    })
}
function Getcolor(value){
    if(value < 40) return "danger"
    else if(value < 80) return "meh"
    else if(value < 120) return "ok"
    else return "cool"
}

const pressed = []
const secretCode = 'fusion!'
window.addEventListener('keyup', (e) => {
  console.log(e.key)
  pressed.push(e.key)
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
  if (pressed.join('').includes(secretCode)) {
    window.location.href ="https://aegide.github.io/"
  }
})
