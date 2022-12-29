const fetch = require('node-fetch');
const core = require('@actions/core');
const octocore = require("@octokit/core")

const repo = (repoName) => {
    if (repoName.includes('/')) {
        return repoName.split('/')[1]
    }
    else return repoName;
};

const pokemon = core.getInput('POKEMON');
const repo_owner = core.getInput('REPOSITORY_OWNER')
const gh_token = core.getInput('GH_TOKEN');
const commit_message = core.getInput('COMMIT_MESSAGE');
const octocore_client = new octocore.Octokit({auth: gh_token})
const repo_name = repo(core.getInput('REPOSITORY'));

console.log(pokemon)

function getReadme(){
    // return octocore_client.request(`GET /repos/${repo_owner}/${repo_name}/contents/README.md?ref=dev`)
    return octocore_client.request(`GET /repos/${repo_owner}/${repo_name}/contents/README.md`)
}

function updateReadme(spriteMarkdown){
    getReadme().then(({ data }) => {
        // console.log(data)
        const rawContent = Buffer.from(data.content, data.encoding).toString();
        const startIndex = rawContent.indexOf("<!--Pokemon Sprite-->")
        const updatedContent = `${startIndex === -1 ? rawContent : rawContent.slice(0, startIndex)}\n${spriteMarkdown}`

        octocore_client.request(`PUT /repos/${repo_owner}/${repo_name}/contents/README.md`, {
            message: commit_message,
            content: Buffer.from(updatedContent, "utf-8").toString(data.encoding),
            path: "README.md",
            sha: data.sha,
            // branch: "dev",
        })
    })
}

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then((data) => { 
            const spriteUrl = data.sprites.front_default;
            const spriteMarkdown = `<!--Pokemon Sprite-->\n![image](${spriteUrl})`;

            console.log(spriteMarkdown);

            updateReadme(spriteMarkdown);
        });