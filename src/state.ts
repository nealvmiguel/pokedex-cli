import { createInterface, type Interface } from 'readline';
// in state.ts
import { getCommands } from './commands/get_commands.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return { rl, commands: getCommands() };
}
