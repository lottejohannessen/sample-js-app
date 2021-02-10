let pokemonRepository = (function() {
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7, weight: 6.9, types: ["grass","poison"]},
    {name: "Snorlax", height: 2.1, weiht: 460, types:["normal"]},
    {name: "squirtle", height: 0.5, weight: 8.5, types:["fire"]}
  ];

    function add (newPokemon) {
      let pokeKeys = Object.keys (newPokemon);
      if (typeof newPokemon === "object") {
          if (pokeKeys[0] === "name"
          && pokeKeys[1] === "height"
          && pokeKeys[2] === "weight"
          && pokeKeys[3] === "types") {
            pokemonLis.push(newPokemon);
          }
          else {
            console.error("Please enter an accepted Pokemon with height,weight and types in the order as listed")
          }
      }
      else {
        console.error("This is not an accepted Pokemon")
      }
    }
    document.write("pokemonList")
})
