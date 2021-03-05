let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function cap(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

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
    loadDetails(pokemon).then(function() {
      let page = document.querySelector('.pokemonList-window');

      function container() {
        let creatediv = document.createElement('div');
        creatediv.classList.add('modal-foreground');

        let createbutton = document.createElement('button');
        createbutton.classList.add('close');
        createbutton.innerHTML = 'X';
        createbutton.addEventListener('click', hide);

        let createimg = document.createElement('img');
        createimg.classList.add('pokemon-img');
        createimg.src = pokemon.imageUrl;
        createimg.alt = 'Image of ' + pokemon.name;

        let createname = document.createElement('h1');
        createname.innerHTML = cap(pokemon.name);

        let createheight = document.createElement('h2');
        createheight.innerHTML = 'Height: ' + pokemon.height + ' m';

        let createweight = document.createElement('h2');
        createweight.innerHTML = 'Weight: ' + pokemon.weight + 'lbs';

        let createtype = document.createElement('h2');
        createtype.innerHTML = 'Type(s): ' + pokemon.types;

        creatediv.appendChild(createbutton);
        creatediv.appendChild(createimg);
        creatediv.appendChild(createname);
        creatediv.appendChild(createheight);
        creatediv.appendChild(createweight);
        creatediv.appendChild(createtype);
        page.prepend(creatediv);

        creatediv.classList.add('visible');
      }

      function hide() {
        let x = page.querySelector('div');
        x.classList.remove('visible');
      }

      window.addEventListener('keydown', (event) => {
        let y = page.querySelector('div');
        if (event.key === 'Escape' && y.classList.contains('visible')) {
          hide();
        }
      });
      container();
    });
  }

  function showLoading() {
    let pokemonList = document.querySelector('.pokemonList-window');
    let newDiv = document.createElement('div');
    newDiv.innerText = 'Loading List!';
    newDiv.classList.add('msg-board');
    pokemonList.prepend(newDiv);
  }

  function hideLoading() {
    let pokemonList = document.querySelector('.pokemonList-window');
    let node = pokemonList.firstElementChild;
    setTimeout(function() {
      node.parentElement.removeChild(node);
    }, 400);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-List');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = cap(pokemon.name);
    button.classList.add('pokemon-list-style');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  function powerDown() {
    let powerButton = document.querySelector('.header-powerbttn');
    powerButton.addEventListener('click', function() {
      if (window.confirm('are you sure you want to power down?')) {
        document.body.style.display = 'none' ;
      }
    });
  }

  function loadList() {
    showLoading();
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
    }).then(function() {
      hideLoading();
    }).catch(function(e) {
      hideLoading();
      console.error(e);
    });
  }

  function loadDetails(item) {
    showLoading();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function(itemType) {
        item.types.push(' ' + cap(itemType.type.name));
      });
    }).then(function() {
      hideLoading();
    }).catch(function(e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    powerDown: powerDown
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});

pokemonRepository.powerDown();
