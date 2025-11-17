import { State } from '../state.js';

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (!args[0]) {
    console.log('Must provide the city to explore');
    return;
  }

  const area = args[0];
  const data = await state.pokeapi.fetchLocation(area);

  console.log(`Exploring ${area}...`);
  console.log(`Found Pokemon:`);

  for (const enc of data.pokemon_encounters) {
    console.log(` - ${enc.pokemon.name}`);
  }
}
