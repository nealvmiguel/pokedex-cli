import { Cache } from '../pokecache.js';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  #cache: Cache;

  constructor(intervalMS: number = 1000) {
    this.#cache = new Cache(intervalMS);
  }

  async #fetchJSON<T>(url: string): Promise<T> {
    const cached = this.#cache.get<T>(url);

    if (cached !== undefined) {
      return cached;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const data: T = await resp.json();

      this.#cache.add(url, data);

      return data;
    } catch (e) {
      throw new Error(`Error fetching URL: ${(e as Error).message}`);
      // throw new Error('Location not found');
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    return this.#fetchJSON<ShallowLocations>(url);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    return this.#fetchJSON<Location>(url);
  }

  async fetchPokemon(pokemonName: string) {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    return this.#fetchJSON<{ base_experience: number }>(url);
  }
}

export type Location = {
  name: string;
  location: { name: string; url: string };
  pokemon_encounters: { pokemon: { name: string; url: string } }[];
};

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};
