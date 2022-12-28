const fetch = require('node-fetch');
const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const pokemon = core.getInput('POKEMON');
const repo = (repoName) => {
    if (repoName.includes('/')) {
        return repoName.split('/')[1]
    }
    else return repoName;
};
const repo_owner = core.getInput('REPOSITORY_OWNER')
const gh_token = core.getInput('GH_TOKEN');
const commit_message = core.getInput('COMMIT_MESSAGE');

const octokit = new Octokit({auth: gh_token})

// const pokemon = process.argv.slice(2)[0];
console.log(pokemon)
// const spriteImageFileName = pokemon+"-sprite.png"
// const spriteImageFile = fs.createWriteStream(spriteImageFileName);

/**
 * 1. Get repository
 * 2. Get the readme
 * 3. Update readme
 */

console.log(`GH_TOKEN: ${gh_token}`);
console.log(`GH_REPO: ${repo(core.getInput('REPOSITORY'))}`);
console.log(`GH_REPO_OWNER: ${repo_owner}`);

const repo_name = repo(core.getInput('REPOSITORY'));

function getRepo(){
    octokit.rest.repos.get({
        owner: repo_owner,
        repo: repo_name,
    })
    .then(({ data }) => {
        console.log(data);
    })
}

getRepo();

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then((data) => { 
            const spriteUrl = data.sprites.front_default;
            const spriteMarkdown = `![image](${spriteUrl})`;

            console.log(spriteMarkdown);

            // await getRepo();
        });

// get pokemon data
// let fetchResponse = fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon);

// console.log(data);
// console.log(data.abilities);
// core.setOutput("abilities", data.abilities);

// const spriteUrl = data.sprites.front_default;
// console.log(spriteUrl);

// https.get(spriteUrl, function(response) {
//     response.pipe(spriteImageFile);
    
//     spriteImageFile.on("finish", () => {
//         spriteImageFile.close();
//         console.log("Downloaded "+spriteImageFileName);
//     });
    
// });

// download sprite from received data
// fetchResponse.then(response => response.json()).then(data => {
//     console.log(data);
//     console.log(data.abilities);
//     core.setOutput("abilities", data.abilities);
//     spriteUrl = data.sprites.front_default;
//     console.log(spriteUrl);

//     https.get(spriteUrl, function(response) {
//         response.pipe(spriteImageFile);
    
//         spriteImageFile.on("finish", () => {
//             spriteImageFile.close();
//             console.log("Downloaded "+spriteImageFileName);
//         });
    
//     });

// });

