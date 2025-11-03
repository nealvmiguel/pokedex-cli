export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations: ShallowLocations = await resp.json();
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      );
    }
  }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  name: string;
  location: { name: string; url: string };
  pokemon_encounters: { pokemon: { name: string; url: string } }[];
};
