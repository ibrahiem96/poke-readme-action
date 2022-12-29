# Poke Readme Action

![image](https://user-images.githubusercontent.com/11240575/210016262-8f323377-576d-424f-b328-cf002a3789ec.png)

## Usage

Add this line to your README.md:
```markdown
<!--Pokemon Sprite-->
```

`NOTE:` If you are using a repo other than your profile repo (for example ibrahiem96/ibrahiem96 is my profile repo), then you may need to add your own github token.

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

```

`NOTE:` regarding naming convention for the pokemon, please check all possible name matches in the [API database](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv). Some pokemon may have multiple sprites because of their changing appearance in game. [Example](https://github.com/ibrahiem96/poke-readme-action/issues/4)

### Blog Guide
Check out the accompanying blog post I've written for this project [here](https://dev.to/imohammd/creating-a-github-action-that-adds-a-pokemon-sprite-to-your-repo-readme-1lcd)

## Contributing

### Requirements
1. Node 16.x
