import { type State } from './state.js';

export function startREPL(state: State): void {
  const rl = state.rl;
  rl.setPrompt('Pokedex > ');
  rl.prompt();

  rl.on('line', input => {
    const words = cleanInput(input);
    if (words.length === 0 || words[0] === '') {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const entry = state.commands[commandName];

    if (!entry) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.rl.prompt();
      return;
    }

    try {
      entry.callback(state);
    } catch {
      console.log('Unknown command');
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(' ')
    .filter(word => word !== '');
}
