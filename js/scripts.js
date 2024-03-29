let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      alert('Please enter valid Pokemon');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let row = $('.row');

      let card = $(
        '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
      );
      let image = $(
        '<img class="card-img-top mx-auto" style="width:30%;" alt="...">'
      );
      let title = $('<h5 class="card-title">' + pokemon.name + '</h5>');
      image.attr('src', pokemon.imageUrlAnimated);
      let body = $('<div class="card-body" style="text-align: center;"></div>');
      let button = $(
        '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
      );

      // Append
      row.append(card);
      card.append(image);
      card.append(body);
      body.append(title);
      body.append(button);

      button.on('click', function() {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.other.dream_world.front_default;
        item.imageUrlAnimated =
          details.sprites.versions['generation-v'][
            'black-white'
          ].animated.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function(itemType) {
          item.types.push(itemType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function(itemAbilities) {
          item.abilities.push(itemAbilities.ability.name);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  let modalContainer = $('#modal-container');
  // showModal function defined here...
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // Clear all existing modal content
    modalTitle.empty();
    modalBody.empty();

    // Create element for pokemon name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');

    // Create img for pokemon in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);

    // Create element for pokemon height in modal content
    let heightElement = $('<p>' + 'height : ' + item.height + '</p>');

    // Create element for pokemon weight in modal content
    let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');

    // Create element for type in modal content
    let typesElement = $('<p>' + 'types : ' + item.types + '</p>');

    // Create element for abilities in modal content
    let abilitiesElement = $('<p>' + 'abilities : ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    // Add class to show modal
    modalContainer.addClass('is-visible');
  }

  return {
    getAll,
    addListItem,
    loadList
  };
})();

pokemonRepository.loadList().then(function() {
  // set up forEach loop on pokemonList
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// search pokemon function defined here...

document.getElementbyId('myInput').addEventListener('keyup', function())
function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('myUL');
  // li = ul.getElementsByTagName("");
  li = ul.querySelectorAll('.card');
  // console.log(li[0].querySelector(".card-body").querySelector(".card-title"));
  for (i = 0; i < li.length; i++) {
    // a = li[i].getElementsByTagName("a")[0];
    a = li[i].querySelector('.card-body').querySelector('.card-title');
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
});
