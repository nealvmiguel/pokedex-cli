import { State } from 'src/state.js';

export async function commandPokedex(state: State): Promise<void> {
  const pokemonInPokedex = state.pokedex;

  console.log(`Your Pokedex:`);
  for (const [_, pokemon] of Object.entries(pokemonInPokedex)) {
    console.log(`- ${pokemon.name}`);
  }
}
