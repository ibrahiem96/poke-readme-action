# Poke Readme Action

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