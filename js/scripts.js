let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
      pokemonList.push(pokemon);
    } else {
      console.log('you need an object');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-List');
    let listItem = document.createElement('div');
    let button = document.createElement('button');
    button.innerText = ['name: ' + pokemon.name, ' height: ' + pokemon.height, ' types: ' + pokemon.types];
    button.classList.add('pokemon-list-style');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    });
  }
function loadDetails(item){
  let url= item.detailsUrl;
  return fetch(url).then(function(response) {
    return response.json();
  }).then(funtion(details){
    item.imageUrl=details.sprites.front_default;
    item.height=details.height;
    item.types=details.types;
  }).catch(function(e){
    console.error(e);
  });
};

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});
