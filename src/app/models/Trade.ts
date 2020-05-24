export interface Trade {
    id?: number;
    name: string;
    type: string;
    longitude: number;
    lattitude: number;
    address: string;
    profilePict?: string|File;
    description: string;
}
