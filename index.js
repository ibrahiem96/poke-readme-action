// This is a sample script to get data from PokeAPI
// How to run
// 1. Clone repository
// 2. Run `node index.js <pokemon-name?>`

// const https = require('https');
// const fs = require('fs');
import fetch from 'node-fetch';
const core = require('@actions/core');
// const github = require('@actions/github');

// get pokemon name from input
const pokemon = core.getInput('pokemon');
// const pokemon = process.argv.slice(2)[0];
console.log(pokemon)
// const spriteImageFileName = pokemon+"-sprite.png"
// const spriteImageFile = fs.createWriteStream(spriteImageFileName);

// get pokemon data
let fetchResponse = fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon);

// download sprite from received data
fetchResponse.then(response => response.json()).then(data => {
    console.log(data);
    console.log(data.abilities);
    core.setOutput("abilities", data.abilities);
    // spriteUrl = data.sprites.front_default;
    // console.log(spriteUrl);

    // https.get(spriteUrl, function(response) {
    //     response.pipe(spriteImageFile);
    
    //     spriteImageFile.on("finish", () => {
    //         spriteImageFile.close();
    //         console.log("Downloaded "+spriteImageFileName);
    //     });
    
    // });

});

