const main = document.querySelector("main");
main.innerHTML = `<p>Nada aún</p>`;

async function getNumPokemones() {
    const data = await (
        await fetch("https://pokeapi.co/api/v2/pokemon/") //Si le agrego /n/ al final, es otro pokemon
    ).json();
    return data.results.length;
}

async function renderPokemon() {
    data = await getNumPokemones();
    const URL = "https://pokeapi.co/api/v2/pokemon";
    let wholeCards = "";
    main.innerHTML = '';


    for (let i = 1; i < data; i++) {
        const pokemonURL = `${URL}/${i}/`;
        const thisPokemon = await (await fetch(pokemonURL)).json();
        console.log(thisPokemon);

        const card = document.createElement('div')
        card.classList = 'card';
        card.innerHTML = (`
        <h2>${thisPokemon.name}</h2>
      `)
        main.appendChild(card);
        

    }
    
}

renderPokemon();

console.log("-------------------------------------");
console.log('Toda la API es:');
getNumPokemones().then(response => console.log(response));