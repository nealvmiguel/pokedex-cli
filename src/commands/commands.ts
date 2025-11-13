import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './map_command.js';
import { commandExplore } from './explore_commands.js';
import { CLICommand } from '../state.js';
import { commandCatch } from './command_catch.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    map: {
      name: 'map',
      description: 'Displays 20 location areas',
      callback: commandMap,
    },

    mapb: {
      name: 'mapb',
      description: 'Displays 20 previous Locations areas',
      callback: commandMapBack,
    },

    explore: {
      name: 'explore',
      description: 'see a list of all the Pokémon in a given area',
      callback: commandExplore,
    },

    catch: {
      name: 'catch',
      description: "Catches a Pokemon  and adds them to the user's Pokedex",
      callback: commandCatch,
    },
  };
}
