const main = document.querySelector("#main");
main.innerHTML = `<p>Nada aún</p>`;

/**
 * @typedef Pokemon
 * @property weight {number}
 */

async function getNumPokemones() {
    const data = await (
        await fetch("https://pokeapi.co/api/v2/pokemon/") //Si le agrego /n/ al final, es otro pokemon
    ).json();
    return data.results.length;
}

async function renderPokemon() {
    const data = await getNumPokemones();
    const URL = "https://pokeapi.co/api/v2/pokemon";
    let wholeCards = "";

    for (let i = 1; i < data+1; i++) {
        const pokemonURL = `${URL}/${i}/`;
        const thisPokemon = await (await fetch(pokemonURL)).json();
        const thisPokemonSpecies = await (await fetch(`${URL}-species/${i}`)).json();
        const thisPokemonStats = await (await fetch(''));

        const arrayTipos = [];
        const arrayMovimientos = [];

        for (let i = 0; i < thisPokemon.types.length; i++) {
            arrayTipos.push(thisPokemon.types[i].type.name);
            //console.log(`${thisPokemon.name} es de tipo/s: ${arrayTipos}`);
        }

        console.log(thisPokemon);
        //console.log(thisPokemon.moves[0].name);
        //for(let i = 0; i< thisPokemon.moves[i].name)

        //Variables del Pokemon
        const nombre = thisPokemon.name;
        const imagen_frente = thisPokemon.sprites.other.home.front_default;
        const tiposSpan = thisPokemon.types.map(tipo => `<span class="${tipo.type.name}">${tipo.type.name}</span>`).join(", ");
        const altura = thisPokemon.height * 10;
        const peso = thisPokemon.weight / 10;
        //const descripcion = thisPokemonSpecies.flavor_text_entries[26].flavor_text;
        const descripcion = thisPokemonSpecies.flavor_text_entries.find(desc => desc.language.name === 'es')?.flavor_text; //Una sola descripción, la primera que encuentre
        //const descripcion = thisPokemonSpecies.flavor_text_entries.filter(desc => desc.language.name === 'es').map(desc => desc.flavor_text).join('<br>'); // Todas las que encuentre (se repiten :/)


        const idModal = `${thisPokemon.name}Modal`;
        const idModalLabel = `${thisPokemon.name}ModalLabel`;
        wholeCards += `
        <div class="card m-2" style="width: 16rem">
            <img class="card-img-top" src="${imagen_frente}" alt="Card image cap" height="254px"/>
            <div class="card-body">
                <h5 class="card-title">${nombre.toUpperCase()}</h5>
                <p>Tipo: ${thisPokemon.types.
                // el .map, es como un foreach, que modifica el arreglo original, y hace push de cada elemento modificado a una copia del arreglo
                // al resultado del .map se le aplica el .join, que separá cada arreglo con un ,
                map(tipo => `<span class="${tipo.type.name}">${tipo.type.name}</span>`).join(", ")}</p>
            </div>
        
            <button type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#${idModal}">
            Ver Pokémon
            </button>
        </div>
        
        <div class="modal fade" id="${idModal}" tabindex="-1" aria-labelledby="${idModalLabel}" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-evenly">
                        <h1 class="modal-title fs-4" id="${idModalLabel}">${nombre.toUpperCase()}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <div class="d-flex flex-row">
                            <img src="${imagen_frente}" class="img-thumbnail border-0 img-modal" alt="imagen de pokemon">
                            <div class="container pd-2">
                                <p class="tipo"><b>Tipo:</b> ${tiposSpan}.</p>
                                <p class="altura"><b>Altura:</b> ${altura} cm.</p>
                                <p class="peso"><b>Peso:</b> ${peso} Kg.</p>
                                <p class="descripcion">${descripcion}</p>
                            </div>
                        </div>
                        <h1 class="fs-5">Stats</h1>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      `
    }

    main.innerHTML = wholeCards;
}
renderPokemon();

console.log("-------------------------------------");
console.log('Toda la API mide:');
getNumPokemones().then(response => console.log(response));