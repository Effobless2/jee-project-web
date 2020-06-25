import { Trade } from './Trade';

export interface Beer {
  id?: number;
  name: string;
  profilePict: string|File;
  type: string;
  alcoholLevel: number;
  description: string;
  sellers?: Trade[];
}
