const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
FetchAPIPokemon();

function FetchAPIPokemon(){
    if(urlParams.has('id')){
        const id = urlParams.get('id')
        fetch('https://pokeapi.co/api/v2/pokemon/'+id).then(response => response.json()).then(response =>{
        console.log(response)
        DisplayImagePokemon(response.sprites);
        GetTypes(response.types);
        GetStats(response.stats);
        
    })
    };
    
}

function DisplayImagePokemon(response){
        let div_image = document.getElementsByClassName('pokemon_image')[0]
        let newimage = document.createElement("img")
        newimage.src = response.front_default
        div_image.appendChild(newimage);
}
function GetTypes(response){
    let div_types = document.getElementsByClassName('pokemon_type')[0]
    alltypes = document.createElement("p")
    response.forEach(type => {
        alltypes.textContent += type.type.name+" "
        TypeEffect(type.type.url);
        
    });
    div_types.appendChild(alltypes)
    
}
function TypeEffect(response){
    fetch(response).then(response => response.json()).then(response =>{
        i=0
        console.log(response)
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