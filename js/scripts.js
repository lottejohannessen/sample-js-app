let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass ','poison']
    },
    {
      name: 'Ivysaur',
      height: 1,
      types: ['grass ','poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: 'fire'
    },
  ];

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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({name: 'Butterfree',height: 1.1,types: ['bug','flying']});

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
