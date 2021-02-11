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

for (let i=0;i<3;i++){
  if (pokemonList[i].height >= 1){
    document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") " + " - Wow,that's big! ");
  }
  else {
    document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") ");
  }
}
