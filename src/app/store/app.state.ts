import { SocialUser } from 'angularx-social-login';

export interface AppState {
    user: SocialUser;
    token: string;
}