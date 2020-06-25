import { Beer } from './Beer';

export interface Trade {
    id?: number;
    name: string;
    type: string;
    longitude: number;
    latitude: number;
    address: string;
    profilePict?: string|File;
    description: string;
    items?: Beer[];
}
