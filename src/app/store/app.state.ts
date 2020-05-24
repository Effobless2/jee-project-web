import { User } from '../models/User';

export interface AppState {
    user: User;
    token: string;
}
