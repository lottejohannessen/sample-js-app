let pokemonList = [
  {
    name:"Bulbasaur",
    height:0.7,
    types:["grass","poison"]
  },
  {
    name: "Ivysaur",
    height:1,
    types:["grass","poison"]
  },
  {
    name: "Charmander",
    height:0.6,
    types:"fire"
  },
];
let pokemonRepository = (function () {
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

pokemonRepository.add(
  {
    name: "Butterfree",
    height: 1.1,
    types: ["bug","flying"]
   }
 );
 console.log(pokemonRepository.getAll());

(function(){
  pokemonList.forEach (function(pokemon){
    if (pokemonList[i].height >= 1){
      document.write(pokemonList[i].name + " (height:" + pokemonList[i].height + ") " + " - Wow,that's big!<br> ");
    }
    else {
      document.write(pokemonList[i].name + " (height:" + pokemonList[i].height + ") <br>");
  });
})();
