import { createInterface, type Interface } from 'readline';
import { CLICommand } from './commands/command.js';
import { getCommands } from './commands/get_commands.js';
import { PokeAPI } from './api/pokeapi.js';

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return {
    rl,
    commands: getCommands(),
    pokeapi: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
