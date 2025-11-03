import { type State } from '../state';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};
