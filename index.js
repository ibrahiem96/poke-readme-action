import fetch from 'node-fetch';
const core = require('@actions/core');
// const github = require('@actions/github');
const { Octokit } = require("@octokit/core");

const pokemon = core.getInput('POKEMON');
const repo = core.getInput('REPOSITORY');
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


function getPokemonSpriteURL() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(json => {
            return json.sprites.front_default;
        });
}

function getNewProjectSection() {
    return `![image](${getPokemonSpriteURL()})`;
}

function commitUpdatedReadme(repo, path, sha, encoding, updatedContent) {
    try {
        octokit.request(`PUT /repos/${repo_owner}/${repo}/contents/{path}`, {
            message: commit_message,
            content: Buffer.from(updatedContent, "utf-8").toString(encoding),
            path,
            sha,
        });
    } catch (error) {
        console.log(error);
    }
}

function updateReadme() {
    try {
        const response = octokit.request(`GET /repos/${repo_owner}/${repo}/contents/README.md`);
        const { path, sha, content, encoding } = response.data;
        const rawContent = Buffer.from(content, encoding).toString();
        const startIndex = rawContent.indexOf("<!--Pokemon Sprite-->");
        const updatedContent = `${startIndex === -1 ? rawContent : rawContent.
            slice(0, startIndex)}\n${getNewProjectSection()}`;
        commitUpdatedReadme(repo, path, sha, encoding, updatedContent);
    } catch (error) {
        try {
            const content = `\n${getNewProjectSection()}`;
            octokit.request(`PUT /repos/${repo_owner}/${repo}/contents/{path}`, {
                message: "Create README",
                content: Buffer.from(content, "utf-8").toString(encoding),
            });
        } catch (error) {
            console.log(error);
        }
        
    }
}

updateReadme();

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

