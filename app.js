// HTML
// Cards
const main = document.querySelector("main");
const nombrePokemon = document.querySelector(".card-title");
const tipoPokemon = document.querySelector(".card-text");
const imagenPokemon = document.querySelector(".card-img-top");

// Modal
const modalImagen = document.querySelector(".img-thumbnail");
const modalNombre = document.querySelector(".modal-title");
const modalTipo = document.querySelector(".tipo");
const modalAltura = document.querySelector(".altura");
const modalPeso = document.querySelector(".peso");
const modalEvoluciones = document.querySelector(".evoluciones");

async function getData() {
  const data = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/rotom")
  ).json();
  console.log(data);
  return data;
}

async function getTipos() {
  const data = await getData();
  const arrayTipos = [];

  for (let i = 0; i < data.types.length; i++) {
    arrayTipos.push(data.types[i].type.name);
  }
  return arrayTipos;
}


async function nombrarPokemon() {
  const data = await getData();

  const pokemonName = data.name.toUpperCase();
  nombrePokemon.innerHTML = pokemonName;
  tipoPokemon.innerHTML = data.types[0].type.name;
  imagenPokemon.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png";
  modalNombre.innerHTML = pokemonName;
  modalImagen.src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png";
  modalTipo.innerHTML = await getTipos().then(result => {return result[0]});  //Debe poder mostrar ambos tipos (foreach)
}

nombrarPokemon();
main.innerHTML = `<p> A la vergaaaaa </p>`
//getTipos().then(result => console.log(result[0]));
