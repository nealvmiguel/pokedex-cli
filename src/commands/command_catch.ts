import { State } from 'src/state.js';

export async function commandCatch(state: State, ...args: string[]) {
  if (!args[0]) {
    throw new Error('you must provide a pokemon name');
  }

  const name = args[0];

  const pokemon = await state.pokeapi.fetchPokemon(name);

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  const pokemonBaseExperience = pokemon.base_experience;
  const catchProbability = 1 / (1 + pokemonBaseExperience / 100);

  if (Math.random() < catchProbability) {
    console.log(`${name} escaped`);
    return;
  }

  state.pokedex[pokemon.name] = pokemon;
  console.log('You may now inspect it with the inspect command.');
  console.log(`${pokemon.name} was caught`);
}
