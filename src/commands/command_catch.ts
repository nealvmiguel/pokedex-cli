import { PokeAPI } from 'src/api/pokeapi';
import { State } from 'src/state.js';

export async function commandCatch(state: State, ...args: string[]) {
  if (!args[0]) {
    console.log('Please Input a Pokemon name');
    return;
  }

  const pokemon = args[0];
  const data = await state.pokeapi.fetchPokemon(pokemon);

  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const pokemonBaseExperience = data.base_experience;
  const catchProbability = 1 / (1 + pokemonBaseExperience / 100);

  if (Math.random() < catchProbability) {
  }
}
