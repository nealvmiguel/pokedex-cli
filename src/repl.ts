import { createInterface } from 'node:readline';
import { getCommands } from './commands/commands.js';

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .map(word => word.toLocaleLowerCase().trim());
}

export function startREPL(): void {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', input => {
    const words = cleanInput(input);

    if (words.length === 0 || words[0] === '') {
      rl.prompt();
      return;
    }

    const commands = getCommands();
    const command = words[0];
    const entry = commands[command];

    try {
      // calling the callback functions
      entry.callback(commands);
    } catch {
      console.log('Unknown command');
    }
    console.log(`Your command was: ${command}`);

    rl.prompt();
  });
}
