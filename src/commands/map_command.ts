import { type State } from '../state.js';

export async function commandMap(state: State): Promise<void> {
  const data = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ?? undefined
  );
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  data.results.forEach(r => console.log(r.name));
}

// TypeScript
export async function commandMapBack(state: State): Promise<void> {
  if (state.prevLocationsURL === null) {
    console.log("you're on the first page");
    return;
  }

  const url =
    state.prevLocationsURL ?? 'https://pokeapi.co/api/v2/location-area';
  const data = await state.pokeapi.fetchLocations(url);

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  data.results.forEach(r => console.log(r.name));
}
