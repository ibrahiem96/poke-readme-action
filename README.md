# Poke Readme Action

Poke Readme Action is a Github action that allows you to pull pokemon sprites from the public pokemon API and add it to your Github READMEs

![image](https://user-images.githubusercontent.com/11240575/210016262-8f323377-576d-424f-b328-cf002a3789ec.png)

## Usage

Add this line to your README.md:
```markdown
<!--Pokemon Sprite-->
```

`NOTE:` If you are using a repo other than your profile repo (for example ibrahiem96/ibrahiem96 is my profile repo), then you may need to add your own github token. Check the [action YAML](https://github.com/ibrahiem96/poke-readme-action/blob/main/action.yaml) for all available inputs.

Then create a workflow that uses this action, example below:

```yaml
name: Poke Readme

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  workflow_dispatch:
    inputs:
      pokemon:
        description: 'Pokemon Name'
        required: true
        default: 'pikachu'

jobs:
  add-poke-sprite:
    name: Add Pokemon Sprite to repo README
    runs-on: ubuntu-latest
    steps:
      - uses: ibrahiem96/poke-readme-action@main
        with:
          pokemon: ${{ inputs.pokemon }}
          # gh_token is only required if you are planning to deploy this action for a repo readme other than your profile repo.
          # gh_token: ${{ inputs.gh_token }}

```

`NOTE:` regarding naming convention for the pokemon, please check all possible name matches in the [API database](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv). Some pokemon may have multiple sprites because of their changing appearance in game. [Example](https://github.com/ibrahiem96/poke-readme-action/issues/4)

### Blog Guide
Check out the accompanying blog post I've written for this project [here](https://dev.to/imohammd/creating-a-github-action-that-adds-a-pokemon-sprite-to-your-repo-readme-1lcd)

## Contributing

### Requirements
1. Node 16.x and latest npm
2. npm packages: `npm install --save node-fetch@v2 @actions/core @octokit/core @vercel/ncc`

### Building
Any and all changes to the javascript will need a recompiling of the js files in the `dist/` directory. To do this you need to run the following command after you finish making any javascript changes:
```bash
ncc build index.js --license licenses.txt
```

### Pull Requests
Please create a new branch for any changes. All pull requests will need to be approved by the administrator(s) before merging. 

