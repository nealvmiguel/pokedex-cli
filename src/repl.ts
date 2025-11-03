import { type State } from './state.js';

export async function startREPL(state: State): Promise<void> {
  const rl = state.rl;
  rl.setPrompt('Pokedex > ');
  rl.prompt();

  rl.on('line', async input => {
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
      // calling callback commands
      await entry.callback(state);
    } catch (e: any) {
      console.log(`Error: ${e?.message ?? e}`);
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
