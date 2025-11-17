import { createInterface, type Interface } from 'readline';
import { getCommands } from './commands/commands.js';
import { PokeAPI, Pokemon } from './api/pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return {
    rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };
}
