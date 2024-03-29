// API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Variáveis
const getElement = document.querySelector.bind(document);
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      detail = Error

var pokeName, // Nome ou numero do Pokémon pesquisado
    pokemon, // Dados recebidos da API
    card; // HTML do Pokémon

// Funções

// Função para requisições do API 
async function requestPokeInfo(url, name) {
  await fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(Error => console.log('Pokémon não encontrado' + detail));
}

// Função para criar o card do Pokémon 
function createCard () {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">${pokemon.name}</h1>
        <font class="number">Nº ${pokemon.id} - Type: ${pokemon.types.map(item => item.type.name).toString()}</font>
        <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
    </div>`;
  return card;
}

// Função que inicia o app
async function startApp(pokeName) {
  await requestPokeInfo(baseUrl, pokeName);
    // Mensagem de erro
    if(detail.response) {
      container.style.display = 'none';
    }
    else {
      container.style.display = 'flex';
      container.innerHTML = createCard();
    }
}

// Buscar com o Enter
searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  searchInput.value = '';
  startApp(pokeName);
  container.classList.add('fade');

  // Efeito Fade
  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});
