// This is a sample script to get data from PokeAPI

console.log("Hello!")

let fetchRes = fetch("https://pokeapi.co/api/v2/pokemon/charmander");

fetchRes.then(res => res.json()).then(d => {
    console.log(d)
})