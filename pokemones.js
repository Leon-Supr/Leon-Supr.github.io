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

    for (let i = 1; i < data; i++) {
        const pokemonURL = `${URL}/${i}/`;
        /** @type {Pokemon} */
        const thisPokemon = await (await fetch(pokemonURL)).json();
        /** @type {string[]} */
        const arrayTipos = [];

        //console.log(thisPokemon);
        for (let i = 0; i < thisPokemon.types.length; i++) {
            arrayTipos.push(thisPokemon.types[i].type.name);
            console.log(`${thisPokemon.name} es de tipo/s: ${arrayTipos}`);
        }

        //Variables del Pokemon
        const nombre = thisPokemon.name;
        const imagen_frente = thisPokemon.sprites.other.home.front_default;
        const tiposSpan = thisPokemon.types.map(tipo => `<span class="${tipo.type.name}">${tipo.type.name}</span>`).join(", ");
        const altura = thisPokemon.height * 10;
        const peso = thisPokemon.weight / 10;
        
        const idModal = `${thisPokemon.name}Modal`;
        const idModalLabel = `${thisPokemon.name}ModalLabel`;
        wholeCards += `
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="${imagen_frente}" alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">${nombre.toUpperCase()}</h5>
                <p>Tipo: ${thisPokemon.types.
                // el .map, es como un foreach, que modifica el arreglo original, y hace push de cada elemento modificado a una copia del arreglo
                // al resultado del .map se le aplica el .join, que separá cada arreglo con un ,
                map(tipo => `<span class="${tipo.type.name}">${tipo.type.name}</span>`).join(", ")}</p>
            </div>
        
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${idModal}">
            Ver Pokémon
            </button>
        </div>
        
        <div class="modal fade" id="${idModal}" tabindex="-1" aria-labelledby="${idModalLabel}" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="${idModalLabel}">${nombre.toUpperCase()}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${imagen_frente}" class="img-thumbnail" alt="imagen de pokemon">
                        <p class="tipo">Tipo: ${tiposSpan}</p>
                        <p class="altura">Altura: ${altura} cm</p>
                        <p class="peso">Peso: ${peso} Kg</p>
                        <p class="evoluciones"></p>
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