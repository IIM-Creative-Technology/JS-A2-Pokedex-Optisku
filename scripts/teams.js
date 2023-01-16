let pokemon_in_team = []
let  alltypesinteams = new Array
let alltypes = document.createElement("p")
let div_types = document.getElementsByClassName('pokemon_type')[0]
let stats_moyenne = [0,0,0,0,0,0]
FetchAPIPokemon(pokemon_in_team) 
x=0



function FetchAPIPokemon(pokemon_in_team){
        pokemon_in_team.forEach(pokemon_id =>{
            fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon_id).then(response => response.json()).then(response =>{
        DisplayImagePokemon(response) 
        GetTypes(response.types) 
        stats_moyenne = GetStats(response.stats) 
        Affichermoyenne(stats_moyenne,response.stats)
        
        })
        
    })
    
    
    div_types.appendChild(alltypes)
    } 
function Affichermoyenne(stats_moyenne,all_stats){
    i=0
    x++
    console.log(x)
    if(x==pokemon_in_team.length){
        stats_moyenne.forEach(stat_moyenne =>{
            
            stat_moyenne = Math.ceil(stat_moyenne/pokemon_in_team.length)
            let stat_texte = document.createElement("p")
            let stats_div = document.getElementsByClassName('Stats')[i]
            stat_texte.textContent = stat_moyenne
            stats_div.appendChild(stat_texte)
            let stat_info = document.createElement("progress")
            stat_info.max = "255"
            stat_info.value = stat_moyenne
            console.log(stat_info.value)
            progressbar_color = Getcolor(stat_info.value)
            stat_info.className =  progressbar_color
            stats_div.appendChild(stat_info)
            i++
            
            
        })
        
        
    }
    
}
function Getcolor(value){
    if(value < 40) return "danger"
    else if(value < 80) return "meh"
    else if(value < 120) return "ok"
    else return "cool"
}
function DisplayImagePokemon(response){
        let div_image = document.getElementsByClassName('pokemon_image')[0]
        let newimage = document.createElement("img")
        newimage.src = response.sprites.front_default
        div_image.appendChild(newimage) 
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
        TypeEffect(type.type.url) 
        alltypesinteams.indexOf(type.type.name) === -1 ? alltypesinteams.push(type.type.name) : console.log("This item already exists") 
    }) 
    alltypes.textContent = ""
    let length_alltypesinteams = alltypesinteams.length
    for(let i = 0; i<4;i++){
        alltypes.textContent += alltypesinteams[i]+" " 
        
    }
    
    
}
function TypeEffect(response){
    fetch(response).then(response => response.json()).then(response =>{
        i=0
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
        typedamage.className ="py-2 px-4 border-2 border-black rounded-full  " + type.name

        typesColors(typedamage)

    }) 
}
function GetStats(stats){
    i=0
    stats.forEach(stat =>{
        stats_moyenne[i] += stat.base_stat
        i++
    })
    return stats_moyenne
}