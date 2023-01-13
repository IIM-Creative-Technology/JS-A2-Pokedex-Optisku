const pokemon_in_team = [1,2,3,4,5,6]
let  alltypesinteams = new Array
let alltypes = document.createElement("p")
let div_types = document.getElementsByClassName('pokemon_type')[0]
FetchAPIPokemon(pokemon_in_team);

function FetchAPIPokemon(pokemon_in_team){
        pokemon_in_team.forEach(pokemon_id =>{
            fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon_id).then(response => response.json()).then(response =>{
        DisplayImagePokemon(response);
        GetTypes(response.types);
        GetStats(response.stats);
        })
        
    })
    div_types.appendChild(alltypes)
    };


function DisplayImagePokemon(response){
        let div_image = document.getElementsByClassName('pokemon_image')[0]
        let newimage = document.createElement("img")
        newimage.src = response.sprites.front_default
        div_image.appendChild(newimage);
}
function GetTypes(response){
    response.forEach(type => {
        TypeEffect(type.type.url);
        alltypesinteams.indexOf(type.type.name) === -1 ? alltypesinteams.push(type.type.name) : console.log("This item already exists");
        console.log(alltypesinteams)
    });
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

    });
}
function GetStats(stats){
    i=0
    stats.forEach(stat =>{
        let stat_texte = document.createElement("p")
        let stats_div = document.getElementsByClassName('Stats')[i]
        stat_texte.textContent += stat.base_stat+" "
        stat_texte.textContent += stat.stat.name
        stats_div.appendChild(stat_texte)
        i++
    })
}