import { exit } from 'node:process';

export function commandExit(): void {
  console.log('Closing the Pokedex... Goodbye!');
  exit(0);
}
