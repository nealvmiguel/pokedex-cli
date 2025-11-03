import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './map_command.js';
import { CLICommand } from './command.js';

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
  };
}
