# Poke Readme Action

NOTE: regarding naming convention for the pokemon, please check all possible name matches in the [API database](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv). Some pokemon may have multiple sprites because of their changing appearance in game. [Example](https://github.com/ibrahiem96/poke-readme-action/issues/4)

## Usage

Add this line to your README.md:
`<!--Pokemon Sprite-->`

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

## Contributing

### Requirements
1. Node 16.x
