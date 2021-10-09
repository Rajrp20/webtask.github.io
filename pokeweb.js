const pokemongroup = document.getElementById('pokemongroup');

console.log(pokemongroup);
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 32; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }


    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({


            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(',')
        }));
        displaypokemon(pokemon);
    });
};


const displaypokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLstring = pokemon
        .map(
            pokemon =>
            `<li class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
            <p class="card-subtitle">Type: ${pokemon.type}</p>
            </li>`

        )
        .join(' ');
    pokemongroup.innerHTML = pokemonHTMLstring;
};

fetchPokemon();