import { State } from 'src/state.js';

export async function commandCatch(state: State, ...args: string[]) {
  if (!args[0]) {
    console.log('Please Input a Pokemon name');
    return;
  }

  const pokemon = args[0];
  try {
    const data = await state.pokeapi.fetchPokemon(pokemon);
    console.log(`Throwing a Pokeball at ${pokemon}...`);

    const pokemonBaseExperience = data.base_experience;
    const catchProbability = 1 / (1 + pokemonBaseExperience / 100);

    if (Math.random() < catchProbability) {
      state.pokedex[pokemon] = { name: pokemon };
      console.log(`${pokemon} was caught`);
    } else {
      console.log(`${pokemon} escaped`);
    }
  } catch (e) {
    console.log(`unknown ${pokemon}`);
    console.log(`${(e as Error).message}`);
  }
}
