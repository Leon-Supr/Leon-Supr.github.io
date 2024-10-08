const main = document.querySelector("main");
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

        wholeCards += `
        <div class="card">
            <h2>${thisPokemon.name}</h2>
            <p>Altura: ${thisPokemon.height} ft</p> 
            <p>Tipo: ${thisPokemon.types.
                // el .map, es como un foreach, que modifica el arreglo original, y hace push de cada elemento modificado a una copia del arreglo
                // al resultado del .map se le aplica el .join, que separá cada arreglo con un ,
                map(tipo => `<span class="${tipo.type.name}">${tipo.type.name}</span>`).join(", ")}</p>
        </div>
      `
    }

    main.innerHTML = wholeCards;
}

renderPokemon();

console.log("-------------------------------------");
console.log('Toda la API es:');
getNumPokemones().then(response => console.log(response));